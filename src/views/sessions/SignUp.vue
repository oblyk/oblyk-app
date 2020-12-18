<template>
  <v-container>
    <v-row class="mt-10" justify="center">
      <v-col sm="12" md="4" align-self="center">
        <sign-up-form v-if="!isLoggedIn"/>

        <p v-if="isLoggedIn">
          vous êtes connecté
          <v-btn @click="logout()">
            me déconnecter
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpForm from '@/components/sessions/SignUpForm'
import store from '@/store'

export default {
  name: 'SignUp',
  components: { SignUpForm },

  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    }
  },

  methods: {
    logout: function () {
      store.dispatch('auth/logout')
    }
  }
}
</script>
<style>
h3 {
  font-family: "Loved by the King", sans-serif;
  font-size: 2em;
}
</style>
