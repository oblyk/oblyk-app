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
    />
  </v-form>
</template>

<script>
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import GymChain from '~/models/GymChain'

export default {
  name: 'GymChainImageForm',
  components: { CloseForm, SubmitForm },
  mixins: [AppConcern],
  props: {
    gymChain: {
      type: Object,
      default: null
    },
    uploadType: {
      type: String,
      required: true
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
      let url

      if (this.uploadType === 'logo') {
        formData.append('gym_chain[logo]', this.file)
        url = `${this.baseUrl}/gym_chains/${this.gymChain.slug_name}/add_logo.json`
      } else {
        formData.append('gym_chain[banner]', this.file)
        url = `${this.baseUrl}/gym_chains/${this.gymChain.slug_name}/add_banner.json`
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
        .then((resp) => {
          const gymChain = new GymChain({ attributes: this.gymChain })
          this.$router.push(gymChain.path)
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
