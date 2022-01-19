<template>
  <div>
    <v-container class="common-page-container">
      <p
        v-if="!showForm"
        class="mt-16 text-center"
      >
        <v-img src="/svg/logo-black.svg" class="mb-2" />
        chargement...
      </p>

      <v-row
        v-else
        justify="center"
      >
        <v-col class="global-form-width" align-self="center">
          <div v-if="!isLoggedIn">
            <h2 class="mb-4">
              {{ $t('actions.signIn') }}
            </h2>

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

  data () {
    return {
      showForm: false,
      redirectTo: null,
      alert: true
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    const alertParams = urlParams.get('alert')
    this.alert = !(alertParams === 'false')

    this.$store.commit('layout/LAYOUT_PADDING', true)

    if (this.$auth.loggedIn && this.redirectTo !== '') {
      this.$router.push(this.redirectTo)
    } else {
      this.showForm = true
    }
  }
}
</script>

<style scoped>
h3 {
  font-family: "Loved by the King", sans-serif;
  font-size: 2em;
}
</style>
