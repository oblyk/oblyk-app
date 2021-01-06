<template>
  <v-form @submit.prevent="signUp">
    <v-text-field
      outlined
      v-model="email"
      :label="$t('models.user.email')"
      type="email"
      required
    />

    <v-text-field
      outlined
      v-model="password"
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPassword = !showPassword"
    />

    <v-text-field
      outlined
      v-model="passwordConfirmation"
      :label="$t('models.user.confirm_password')"
      :type="showPasswordConfirmation ? 'text' : 'password'"
      required
      :append-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    />

    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="firstName"
          :label="$t('models.user.first_name')"
          required
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="lastName"
          :label="$t('models.user.last_name')"
        />
      </v-col>
    </v-row>

    <date-picker-input
      v-model="dateOfBirth"
      :label="$t('models.user.date_of_birth')"
    />

    <v-checkbox
      class="mt-0"
      hide-details
      v-model="termsOfUse"
      :label="$t('components.session.termsOfUse')"
    />
    <router-link to="/terms-of-use" class="ml-8">
      {{ $t('termsOfUse.title') }}
    </router-link>

    <v-checkbox
      v-model="rememberMe"
      :label="$t('components.session.stayConnected')"
    />

    <submit-form
      submit-local-key="actions.createMyAccount"
      :overlay="submitOverlay"
    >
     <v-btn
      text
      to="/sign-in"
      color="primary"
      class="float-right"
     >
       {{ $t('actions.signIn') }}
     </v-btn>
    </submit-form>
  </v-form>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'
import { FormHelpers } from '@/mixins/FormHelpers'
import DatePickerInput from '@/components/forms/DatePickerInput'
export default {
  name: 'SignUpForm',
  components: { DatePickerInput, SubmitForm },
  mixins: [FormHelpers],
  props: {
    redirectTo: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      termsOfUse: false,
      email: null,
      password: null,
      passwordConfirmation: null,
      showPassword: false,
      showPasswordConfirmation: false,
      lastName: null,
      firstName: null,
      dateOfBirth: null,
      dateOfBirthModal: false,
      rememberMe: true
    }
  },

  methods: {
    signUp: function () {
      if (!this.termsOfUse) {
        this.$root.$emit('alerteSimpleError', this.$t('components.session.youMustBeAgree'))
        return
      }

      this.submitOverlay = true

      const data = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        last_name: this.lastName,
        first_name: this.firstName,
        date_of_birth: this.dateOfBirth,
        remember_me: this.rememberMe
      }
      this.$store
        .dispatch('auth/signUp', data)
        .then(() => {
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else {
            this.$router.push('/me/new/avatar')
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
