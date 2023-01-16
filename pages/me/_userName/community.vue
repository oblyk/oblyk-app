<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-community-tabs :user="currentUser" />
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>
<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserCommunityTabs from '@/components/users/layouts/UserCommunityTabs'

export default {
  components: { UserCommunityTabs, Spinner },
  mixins: [CurrentUserConcern],

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
