<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <div class="thumbnail-crop-area mb-5">
      <vue-cropper
        ref="cropper"
        :img="gymRoute.pictureUrl()"
        :outputSize="1"
        outputType="jpeg"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :centerBox="true"
        :fixed="true"
        :fixedNumber="[1, 1]"
      />
    </div>
    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { VueCropper } from 'vue-cropper'
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'
import axios from 'axios'

export default {
  name: 'GymRouteThumbnailForm',
  components: { CloseForm, SubmitForm, VueCropper },
  mixins: [FormHelpers, AppConcern, SessionConcern],
  props: {
    gymRoute: Object
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

      this.$refs.cropper.getCropBlob((data) => {
        formData.append('gym_route[thumbnail]', data)

        axios({
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
            const gymRoute = new GymRoute(resp.data)
            this.$router.push(gymRoute.gymSpacePath())
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
  max-height: calc(100vh - 100px);
}
</style>
