<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      placeholder="Fichier .obj.zip ou .gltf"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>

<script>
import { mdiMenuDown, mdiMenuRight } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymSpaceThreeDPlanForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      file: null,
      redirectTo: null,
      uploadPercentage: 0,

      mdiMenuDown,
      mdiMenuRight
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const formData = new FormData()
      if (this.file) {
        formData.append('gym_space[three_d_file]', this.file)
      }

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymSpace.gym.id}/gym_spaces/${this.gymSpace.id}/add_three_d_file.json`,
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
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else {
            this.$router.push(`${this.gymSpace.Gym.adminPath}/spaces/${this.gymSpace.id}/edit-three-d`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
