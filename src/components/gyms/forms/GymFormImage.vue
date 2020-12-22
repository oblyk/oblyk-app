<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >

    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      placeholder="Séléctionner un nouveau logo"
    ></v-file-input>

    <submit-form :overlay="overlay" />
  </v-form>
</template>
<script>
import GymApi from '@/services/oblyk-api/gym'
import Gym from '@/models/Gym'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'GymFormImage',
  components: { SubmitForm },
  props: {
    gym: {
      type: Object,
      required: false
    },
    uploadType: String
  },

  data () {
    return {
      overlay: false,
      file: null
    }
  },

  methods: {
    submit: function () {
      this.overlay = true
      const formData = new FormData()
      let promise

      if (this.uploadType === 'logo') {
        formData.append('gym[logo]', this.file)
        promise = GymApi.logo(formData, this.gym.id)
      } else {
        formData.append('gym[banner]', this.file)
        promise = GymApi.banner(formData, this.gym.id)
      }

      promise
        .then((resp) => {
          const gym = new Gym(resp.data)
          this.$router.push(gym.url())
        })
        .catch((err) => {
          console.error(err)
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
