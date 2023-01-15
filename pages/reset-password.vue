<template>
  <div>
    <v-container class="common-page-container">
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <h2 class="mb-4">
            {{ $t('components.session.forgottenPassword') }}
          </h2>
          <reset-password-form />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import ResetPasswordForm from '@/components/sessions/ResetPasswordForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, ResetPasswordForm },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mot de passe oublié ?',
        metaDescription: 'Vous avez oublié votre mot de passe ? renseignez votre adresse mail pour le réinitialiser'
      },
      en: {
        metaTitle: 'Forgot your password?',
        metaDescription: 'Forgot your password? Enter your email address to reset it'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') }
      ]
    }
  }
}
</script>
