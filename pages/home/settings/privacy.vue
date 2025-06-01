<template>
  <div>
    <page-header
      :title="$t('components.user.privacyParameters')"
      back-to="/home/settings"
    />

    <v-container class="pt-6">
      <user-privacy-form
        v-if="currentUser"
        :user="currentUser"
        submit-methode="put"
      />
      <v-skeleton-loader
        v-else
        type="article"
      />
    </v-container>
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
