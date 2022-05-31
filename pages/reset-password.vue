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

  head () {
    return {
      title: this.$t('meta.session.resetPasswordTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.session.resetPasswordDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.session.resetPasswordTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.session.resetPasswordDescription') }
      ]
    }
  }
}
</script>
