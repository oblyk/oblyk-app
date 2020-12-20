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
      showPassword: false
    }
  },

  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      this.overlay = true
      this.$store
        .dispatch('auth/login', {
          email,
          password
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
