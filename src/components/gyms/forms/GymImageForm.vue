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
    <submit-form :overlay="overlay" />
  </v-form>
</template>
<script>
import GymApi from '@/services/oblyk-api/GymApi'
import Gym from '@/models/Gym'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymImageForm',
  components: { CloseForm, SubmitForm },
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
          this.$router.push(gym.path())
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
