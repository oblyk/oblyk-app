<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-model="plan"
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
import GymSpaceApi from '@/services/oblyk-api/GymSpaceApi'
import GymSpace from '@/models/GymSpace'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymSpacePlanForm',
  mixins: [FormHelpers],
  components: { CloseForm, SubmitForm },
  props: {
    gymSpace: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      plan: null
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()
      formData.append('gym_space[plan]', this.plan)

      GymSpaceApi
        .plan(formData, this.gymSpace.gym.id, this.gymSpace.id)
        .then((resp) => {
          const gymSpace = new GymSpace(resp.data)
          this.$router.push(gymSpace.url())
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
