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
      :go-back-btn="goBackBtn"
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymRoutePictureForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern, SessionConcern],
  props: {
    gymRoute: {
      type: Object,
      default: null
    },
    goBackBtn: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
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

      formData.append('gym_route[picture]', this.file)

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymRoute.gym.id}/gym_routes/${this.gymRoute.id}/add_picture.json`,
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
        .then((resp) => {
          const gymRoute = new GymRoute({ attributes: resp.data })
          if (this.callback) {
            this.callback(gymRoute)
          } else {
            this.$router.push(`${gymRoute.path}/thumbnail`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
