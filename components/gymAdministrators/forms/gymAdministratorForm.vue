<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.email"
      outlined
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
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymAdministratorForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
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
    submit () {
      this.submitOverlay = true

      new GymAdministratorApi(this.$axios, this.$auth)
        .create(this.data)
        .then(() => {
          this.$router.push(`${this.gym.adminPath}/administrators`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
