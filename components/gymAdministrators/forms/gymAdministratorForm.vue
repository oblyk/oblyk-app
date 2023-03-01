<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-if="!isEditingForm()"
      v-model="data.requested_email"
      outlined
      required
      :label="$t('models.user.email')"
    />

    <gym-roles-input v-model="data.roles" />

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
import GymRolesInput from '~/components/forms/GymRolesInput.vue'

export default {
  name: 'GymAdministratorForm',
  components: { GymRolesInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymAdministrator: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.gymAdministrator?.id,
        requested_email: this.gymAdministrator?.requested_email,
        gym_id: this.gym.id,
        roles: this.gymAdministrator?.roles
      },
      roles: [
        { text: this.$t('models.role.analyste'), value: 'analyste' },
        { text: this.$t('models.role.opener'), value: 'opener' },
        { text: this.$t('models.role.chief_opener'), value: 'chief_opener' },
        { text: this.$t('models.role.administrator'), value: 'administrator' }
      ]
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymAdministratorApi(this.$axios, this.$auth).update(this.data) : new GymAdministratorApi(this.$axios, this.$auth).create(this.data)

      promise
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
