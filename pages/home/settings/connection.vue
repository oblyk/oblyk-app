<template>
  <div>
    <page-header
      :title="$t('components.user.changePassword')"
      back-to="/home/settings"
    />

    <div class="d-flex justify-center pb-10">
      <v-col class="global-form-width px-3">
        <connection-form
          v-if="currentUser"
          :user="currentUser"
          submit-methode="put"
        />
        <v-skeleton-loader
          v-else
          type="article"
        />
      </v-col>
    </div>
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
