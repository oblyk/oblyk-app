<template>
  <div>
    <spinner v-if="!currentUser" />

    <div v-else>
      <user-settings-tabs :user="currentUser" />
      <router-view :user="currentUser" />
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import UserSettingsTabs from '~/components/users/layouts/UserSettingsTabs.vue'

export default {
  components: { UserSettingsTabs, Spinner },
  mixins: [CurrentUserConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Paramètres'
      },
      en: {
        metaTitle: 'Settings'
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
