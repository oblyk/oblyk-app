<template>
  <div>
    <setting-back-btn title-key="components.user.changePassword" />

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
import SettingBackBtn from '~/components/users/layouts/SettingBackBtn'

export default {
  components: { SettingBackBtn, ConnectionForm },
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
