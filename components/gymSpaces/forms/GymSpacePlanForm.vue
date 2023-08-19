<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <v-file-input
      v-model="plan"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
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
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import GymSpace from '@/models/GymSpace'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymSpacePlanForm',
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
      plan: null,
      uploadPercentage: 0
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const formData = new FormData()
      formData.append('gym_space[plan]', this.plan)

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymSpace.gym.id}/gym_spaces/${this.gymSpace.id}/add_plan.json`,
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
          const gymSpace = new GymSpace({ attributes: resp.data })
          this.$router.push(gymSpace.path)
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
