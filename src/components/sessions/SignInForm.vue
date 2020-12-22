<template>
  <v-form @submit.prevent="login">

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

    <v-checkbox
      v-model="rememberMe"
      label="Rester connecté"
    />

    <submit-form
      submit-local-key="actions.signIn"
      :overlay="overlay"
    />

  </v-form>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'
export default {
  name: 'SignInForm',
  components: { SubmitForm },
  props: {
    redirectTo: {
      type: String,
      required: false,
      default: '/'
    }
  },

  data () {
    return {
      overlay: false,
      email: null,
      password: null,
      showPassword: false,
      rememberMe: false
    }
  },

  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      const rememberMe = this.rememberMe
      this.overlay = true
      this.$store
        .dispatch('auth/login', {
          email,
          password,
          rememberMe
        })
        .then(() => {
          this.$router.push(this.redirectTo || '/')
        })
        .catch(err => {
          console.error(err)
        })
        .then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
