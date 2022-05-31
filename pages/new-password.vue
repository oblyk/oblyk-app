<template>
  <div>
    <v-container class="common-page-container">
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <h2 class="mb-4">
            {{ $t('components.session.newPassword') }}
          </h2>

          <new-password-form />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import NewPasswordForm from '@/components/sessions/NewPasswordForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, NewPasswordForm },

  head () {
    return {
      title: this.$t('meta.session.newPassword'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
