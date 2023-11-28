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

    <close-form />
    <submit-form
      :overlay="overlay"
      :progressable="true"
      :progress-value="uploadPercentage"
      :go-back-btn="false"
    />
  </v-form>
</template>

<script>
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'ContestBannerForm',
  components: { CloseForm, SubmitForm },
  mixins: [AppConcern],
  props: {
    contest: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      uploadPercentage: 0,
      overlay: false,
      file: null
    }
  },

  methods: {
    submit () {
      this.overlay = true
      const formData = new FormData()

      formData.append('contest[banner]', this.file)
      const url = `${this.baseUrl}/gyms/${this.contest.gym.id}/contests/${this.contest.id}/add_banner.json`

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
          if (this.callback) {
            this.callback()
          } else {
            this.$router.push(this.contest.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
