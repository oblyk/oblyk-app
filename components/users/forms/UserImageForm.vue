<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
      submit-local-key="actions.upload"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'UserImageForm',
  components: { SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    user: {
      type: Object,
      default: null
    },
    uploadType: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      uploadPercentage: 0,
      file: null
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const formData = new FormData()
      let url

      if (this.uploadType === 'avatar') {
        formData.append('user[avatar]', this.file)
        url = `${this.baseUrl}/current_users/avatar.json`
      } else {
        formData.append('user[banner]', this.file)
        url = `${this.baseUrl}/current_users/banner.json`
      }

      this.$axios.$request({
        method: 'POST',
        url,
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local'),
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        },
        data: formData
      })
        .then(() => {
          this.$auth
            .fetchUser()
            .then(() => {
              this.$router.push('/')
            })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
