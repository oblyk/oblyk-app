<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width" align-self="center">

        <div v-if="!isLoggedIn">
          <h2 class="mb-4">{{  $t('actions.signIn') }}</h2>

          <v-alert
            v-if="redirectTo !== null && alert"
            outlined
            type="warning"
          >
            {{ $t('components.session.connectAlert') }}
          </v-alert>

          <sign-in-form :redirect-to="redirectTo"/>
        </div>

        <p v-if="isLoggedIn">
          <v-alert
            outlined
            type="info"
          >
            {{ $t('components.session.alreadyConnected') }}
          </v-alert>
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import SignInForm from '@/components/sessions/SignInForm'

export default {
  name: 'SignInView',
  mixins: [SessionConcern],
  components: { SignInForm },

  data () {
    return {
      redirectTo: null,
      alert: true
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    const alertParams = urlParams.get('alert')
    this.alert = !(alertParams === 'false')
  }
}
</script>
<style scoped>
h3 {
  font-family: "Loved by the King", sans-serif;
  font-size: 2em;
}
</style>
