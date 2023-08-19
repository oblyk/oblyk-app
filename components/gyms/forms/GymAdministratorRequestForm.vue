<template>
  <div>
    <div v-if="submitted">
      <v-alert
        type="success"
        class="mt-7"
        v-html="$t('components.gymAdministrationRequest.requestIsSent')"
      />
      <p class="text-center">
        <v-btn
          outlined
          color="primary"
          :to="gym.path"
        >
          {{ $t('actions.backToName', { name: gym.name }) }}
        </v-btn>
      </p>
    </div>

    <v-form
      v-if="!submitted && $auth.loggedIn"
      class="mt-7"
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="data.first_name"
        outlined
        :label="$t('models.gymAdministratorRequest.first_name')"
        required
      />

      <v-text-field
        v-model="data.last_name"
        outlined
        :label="$t('models.gymAdministratorRequest.last_name')"
        required
      />

      <v-text-field
        v-model="data.email"
        outlined
        type="email"
        :label="$t('models.gymAdministratorRequest.email')"
        required
      />

      <v-textarea
        v-model="data.justification"
        outlined
        :label="$t('models.gymAdministratorRequest.justification')"
      />

      <close-form />
      <submit-form :overlay="submitOverlay" />
    </v-form>
  </div>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import GymAdministratorRequestApi from '~/services/oblyk-api/GymAdministratorRequestApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymAdministratorRequestForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      submitted: false,
      data: {
        last_name: this.$auth.loggedIn ? this.$auth.user.last_name : null,
        first_name: this.$auth.loggedIn ? this.$auth.user.first_name : null,
        justification: null,
        email: this.$auth.loggedIn ? this.$auth.user.email : null,
        gym_id: this.gym.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true

      new GymAdministratorRequestApi(this.$axios, this.$auth)
        .create(this.data)
        .then(() => {
          this.submitted = true
          if (this.callback) {
            this.callback()
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministratorRequest')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
