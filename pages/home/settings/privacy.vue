<template>
  <div>
    <page-header
      :title="$t('components.user.privacyParameters')"
      back-to="/home/settings"
    />

    <div class="d-flex justify-center pb-10">
      <div class="global-form-width px-3">
        <user-privacy-form
          v-if="currentUser"
          :user="currentUser"
          submit-methode="put"
        />
        <v-skeleton-loader
          v-else
          type="article"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import UserPrivacyForm from '~/components/users/forms/PrivacyForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, UserPrivacyForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes paramètres de confidentialité'
      },
      en: {
        metaTitle: 'My privacy parameters'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
