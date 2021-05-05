<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <close-form />
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
import { SessionConcern } from '@/concerns/SessionConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import axios from 'axios'

export default {
  name: 'UserImageForm',
  mixins: [FormHelpers, AppConcern, SessionConcern],
  components: { CloseForm, SubmitForm },
  props: {
    user: {
      type: Object,
      required: false
    },
    uploadType: String
  },

  data () {
    return {
      uploadPercentage: 0,
      file: null
    }
  },

  methods: {
    submit: function () {
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

      axios({
        method: 'POST',
        url: url,
        headers: {
          Authorization: this.getToken,
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        },
        data: formData
      })
        .then(() => {
          this.$router.push('/')
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
