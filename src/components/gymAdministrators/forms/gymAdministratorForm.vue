<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.email"
      required
      :label="$t('models.user.email')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymAdministratorApi from '@/services/oblyk-api/GymAdministratorApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymAdministratorForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gym: Object
  },

  data () {
    return {
      data: {
        email: null,
        gymId: this.gym.id,
        level: 'administrator'
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      GymAdministratorApi
        .create(this.data)
        .then(() => {
          this.$router.push(this.gym.path('administrators'))
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
