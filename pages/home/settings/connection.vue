<template>
  <div>
    <page-header
      :title="$t('components.user.changePassword')"
      back-to="/home/settings"
    />

    <v-container class="pt-6">
      <connection-form
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
import ConnectionForm from '~/components/users/forms/ConnectionForm'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, ConnectionForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes paramètres de connexion'
      },
      en: {
        metaTitle: 'My connection parameters'
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
