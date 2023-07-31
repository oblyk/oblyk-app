<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <div
      class="thumbnail-crop-area mb-5"
      style="height: 650px; max-height: calc(100vh - 285px);"
    >
      <vue-cropper
        ref="cropper"
        :img="gymRoute.pictureUrl"
        :output-size="1"
        output-type="jpeg"
        :auto-crop="true"
        :auto-crop-width="gymRoute.thumbnail_position ? gymRoute.thumbnail_position.thb_w : 150"
        :auto-crop-height="gymRoute.thumbnail_position ? gymRoute.thumbnail_position.thb_h : 150"
        :center-box="true"
        :fixed="true"
        :fixed-number="[1, 1]"
      />
    </div>
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
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymRouteThumbnailForm',
  components: { SubmitForm, VueCropper },
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
      const imgPosition = this.$refs.cropper.getImgAxis()
      const thbPosition = this.$refs.cropper.getCropAxis()
      const cropData = {
        img_w: imgPosition.x2 - imgPosition.x1,
        img_h: imgPosition.y2 - imgPosition.y1,
        thb_h: this.$refs.cropper.cropH,
        thb_w: this.$refs.cropper.cropW,
        thb_x: thbPosition.x1 - imgPosition.x1,
        thb_y: thbPosition.y1 - imgPosition.y1
      }

      this.$refs.cropper.getCropBlob((data) => {
        formData.append('gym_route[thumbnail]', data)
        formData.append('gym_route[thumbnail_position]', JSON.stringify(cropData))

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
              setTimeout(() => {
                this.$router.push(
                  {
                    path: gymRoute.gymSpacePath,
                    query: {
                      route: gymRoute.id
                    }
                  }
                )
              }, 500)
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
