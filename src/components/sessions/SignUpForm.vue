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

    <v-text-field
      outlined
      v-model="firstName"
      :label="$t('models.user.first_name')"
      required
    />

    <v-text-field
      outlined
      v-model="lastName"
      :label="$t('models.user.last_name')"
    />

    <v-dialog
      ref="dialog"
      v-model="dateOfBirthModal"
      :return-value.sync="dateOfBirth"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateOfBirth"
          :label="$t('models.user.date_of_birth')"
          readonly
          outlined
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateOfBirth"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="dateOfBirthModal = false"
        >
          {{ $t('actions.cancel') }}
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(dateOfBirth)"
        >
          {{ $t('actions.ok') }}
        </v-btn>
      </v-date-picker>
    </v-dialog>

    <v-checkbox
      v-model="rememberMe"
      :label="$t('components.session.stayConnected')"
    />

    <submit-form
      submit-local-key="actions.createMyAccount"
      :overlay="submitOverlay"
    />
  </v-form>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'
import { FormHelpers } from '@/mixins/FormHelpers'
export default {
  name: 'SignUpForm',
  components: { SubmitForm },
  mixins: [FormHelpers],
  data () {
    return {
      email: null,
      password: null,
      passwordConfirmation: null,
      showPassword: false,
      showPasswordConfirmation: false,
      lastName: null,
      firstName: null,
      dateOfBirth: null,
      dateOfBirthModal: false,
      rememberMe: false
    }
  },

  methods: {
    signUp: function () {
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
          this.$router.push('/')
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
