<template>
  <v-form @submit.prevent="login">
    <v-text-field
      outlined
      v-model="email"
      label="Email"
      type="email"
      required
    ></v-text-field>

    <v-text-field
      outlined
      v-model="password"
      label="Mot de passe"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <div class="text-right">
      <v-btn color="primary" type="submit">
        Me connecter
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'SignInForm',
  data () {
    return {
      email: null,
      password: null,
      showPassword: false
    }
  },

  methods: {
    submit: function () {
      this.$refs.form.submit()
    },

    login: function () {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('auth/login', {
          email,
          password
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
