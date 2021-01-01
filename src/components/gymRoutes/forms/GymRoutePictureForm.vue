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
    ></v-file-input>

    <close-form />
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import GymRouteApi from '@/services/oblyk-api/gymRouteApi'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymRoutePictureForm',
  components: { CloseForm, SubmitForm },
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

      formData.append('gym_route[picture]', this.file)

      GymRouteApi
        .picture(
          formData,
          this.gymRoute.gym.id,
          this.gymRoute.id
        )
        .then((resp) => {
          const gymRoute = new GymRoute(resp.data)
          this.$router.push(gymRoute.url('thumbnail'))
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
