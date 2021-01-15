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
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import GymRouteApi from '@/services/oblyk-api/GymRouteApi'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'
import { VueCropper } from 'vue-cropper'

export default {
  name: 'GymRouteThumbnailForm',
  components: { CloseForm, SubmitForm, VueCropper },
  mixins: [FormHelpers],
  props: {
    gymRoute: Object
  },

  data () {
    return {
      file: null
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()

      this.$refs.cropper.getCropBlob((data) => {
        formData.append('gym_route[thumbnail]', data)

        GymRouteApi
          .thumbnail(
            formData,
            this.gymRoute.gym.id,
            this.gymRoute.id
          )
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
