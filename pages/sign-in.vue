<template>
  <div>
    <v-container class="common-page-container">
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <div v-if="!isLoggedIn">
            <h1 class="mb-4 text-h5 font-weight-bold">
              {{ $t('actions.signIn') }}
            </h1>

            <v-alert
              v-if="redirectTo !== null && alert"
              outlined
              type="warning"
            >
              {{ $t('components.session.connectAlert') }}
            </v-alert>

            <sign-in-form :redirect-to="redirectTo" />
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
    <app-footer />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import SignInForm from '@/components/sessions/SignInForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, SignInForm },
  mixins: [SessionConcern],

  data () {
    return {
      redirectTo: null,
      alert: true
    }
  },

  head () {
    return {
      title: this.$t('meta.session.signInTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.session.signInDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.session.signInTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.session.signInDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/sign-in` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    const alertParams = urlParams.get('alert')
    this.alert = !(alertParams === 'false')

    if (this.$auth.loggedIn && this.redirectTo !== '') {
      this.$router.push(this.redirectTo)
    }
  }
}
</script>
