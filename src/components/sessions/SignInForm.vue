<template>
  <v-form @submit.prevent="login">
    <v-text-field
      outlined
      v-model="oblyk_full_name"
      required
      hide-details
      tabindex="-1"
      autocomplete="off"
      :label="$t('models.oblyk_full_name')"
      class="mb-2 full-name-field-form"
    />

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
    >
      <v-btn
        text
        small
        to="/sign-up"
        color="primary"
        class="mt-1 float-right"
      >
        {{ $t('actions.signUp') }}
      </v-btn>
    </submit-form>
    <p class="text-right mt-5">
      <router-link to="/reset-password">
        {{ $t('components.session.forgottenPassword') }}
      </router-link>
    </p>
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
      oblyk_full_name: null,
      email: null,
      password: null,
      showPassword: false,
      rememberMe: true
    }
  },

  methods: {
    login: function () {
      this.overlay = true
      const data = {
        email: this.email,
        password: this.password,
        oblyk_full_name: this.oblyk_full_name
      }

      this.$store
        .dispatch('auth/login', data)
        .then(() => {
          this.$router.push(this.redirectTo || '/')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
