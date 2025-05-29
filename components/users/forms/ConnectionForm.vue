<template>
  <div>
    <v-form @submit.prevent="submit()">
      <v-text-field
        v-model="data.email"
        outlined
        required
        :label="$t('models.user.email')"
      />
      <v-text-field
        v-model="data.password"
        outlined
        :label="$t('models.user.password')"
        :type="showPassword ? 'text' : 'password'"
        required
        :append-icon="showPassword ? mdiEyeOff : mdiEye"
        class="required-field"
        :hint="$t('models.password.rules')"
        persistent-hint
        @click:append="showPassword = !showPassword"
      />
      <v-text-field
        v-model="data.password_confirmation"
        outlined
        :label="$t('models.user.confirm_password')"
        :type="showPasswordConfirmation ? 'text' : 'password'"
        required
        :append-icon="showPasswordConfirmation ? mdiEyeOff : mdiEye"
        class="required-field"
        @click:append="showPasswordConfirmation = !showPasswordConfirmation"
      />
      <submit-form
        :overlay="submitOverlay"
        :go-back-btn="false"
        submit-local-key="actions.change"
      />
    </v-form>
  </div>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'

export default {
  name: 'ConnectionForm',
  components: { SubmitForm },
  mixins: [FormHelpers],
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      showPassword: false,
      showPasswordConfirmation: false,
      data: {
        email: (this.user || {}).email,
        password: null,
        password_confirmation: null
      },

      mdiEye,
      mdiEyeOff
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true

      new CurrentUserApi(this.$axios, this.$auth)
        .updatePassword(this.data)
        .then(() => {
          this.$auth.fetchUser().then(() => {
            this.$router.push('/')
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'password')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
