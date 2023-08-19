<template>
  <div>
    <v-container class="common-page-container">
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <div v-if="!$auth.loggedIn">
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

          <client-only>
            <p v-if="$auth.loggedIn">
              <v-alert
                outlined
                type="info"
              >
                {{ $t('components.session.alreadyConnected') }}
              </v-alert>
            </p>
          </client-only>
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import SignInForm from '@/components/sessions/SignInForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, SignInForm },

  data () {
    return {
      redirectTo: null,
      alert: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Me connecter',
        metaDescription: 'Me connecter à mon compte Oblyk et retrouver toutes les infos de la grimpes autour de chez moi'
      },
      en: {
        metaTitle: 'Connect me',
        metaDescription: 'Connect me to my Oblyk account and find all informations about the climbing around me'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/sign-in` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    const alertParams = urlParams.get('alert')
    this.alert = !(alertParams === 'false')

    if (this.$auth.loggedIn && this.redirectTo && this.redirectTo !== '') {
      this.$router.push(this.redirectTo)
    }
  }
}
</script>
