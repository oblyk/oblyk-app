<template>
  <div>
    <user-community-tabs />

    <spinner v-if="!currentUser" />
    <div v-else>
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>
<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import UserCommunityTabs from '~/components/users/layouts/UserCommunityTabs.vue'

export default {
  components: { UserCommunityTabs, Spinner },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma communauté'
      },
      en: {
        metaTitle: 'My community'
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
