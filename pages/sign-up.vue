<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <h1 class="mb-4 text-h5 font-weight-bold">
            {{ $t('actions.createMyAccount') }}
          </h1>

          <sign-up-form
            v-if="!$auth.loggedIn"
            :redirect-to="redirectTo"
            :pre-filled-email="preFilledEmail"
          />

          <client-only>
            <div v-if="$auth.loggedIn">
              <v-alert
                outlined
                type="info"
              >
                {{ $t('components.session.alreadyConnected') }}
              </v-alert>
            </div>
          </client-only>
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import SignUpForm from '@/components/sessions/SignUpForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, SignUpForm },

  data () {
    return {
      redirectTo: null,
      preFilledEmail: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Me créer un compte',
        metaDescription: "Me créer un mon compte pour suivre ma progression, trouver des partenaire d'escalade et avoir des infos local de la communauté de la grimpe"
      },
      en: {
        metaTitle: 'Create an account',
        metaDescription: 'Create an account to track my progress, find climbing partners and get local info from the climbing community'
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
    this.preFilledEmail = urlParams.get('email')
  }
}
</script>
