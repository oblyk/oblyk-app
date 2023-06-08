<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <div class="thumbnail-crop-area mb-5">
      <vue-cropper
        ref="cropper"
        :img="gymRoute.pictureUrl"
        :output-size="1"
        output-type="jpeg"
        :auto-crop="true"
        auto-crop-width="150"
        auto-crop-height="150"
        :center-box="true"
        :fixed="true"
        :fixed-number="[1, 1]"
      />
    </div>
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
import { VueCropper } from 'vue-cropper'
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymRouteThumbnailForm',
  components: { CloseForm, SubmitForm, VueCropper },
  mixins: [FormHelpers, AppConcern, SessionConcern],
  props: {
    gymRoute: {
      type: Object,
      required: true
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

      this.$refs.cropper.getCropBlob((data) => {
        formData.append('gym_route[thumbnail]', data)

        this.$axios({
          method: 'POST',
          url: `${this.baseUrl}/gyms/${this.gymRoute.gym.id}/gym_routes/${this.gymRoute.id}/add_thumbnail.json`,
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
              this.$router.push(`${gymRoute.gymSpacePath}?route=${gymRoute.id}`)
            }
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymRoute')
          }).then(() => {
            this.submitOverlay = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail-crop-area {
  height: 650px;
  max-height: calc(100vh - 250px);
}
</style>
