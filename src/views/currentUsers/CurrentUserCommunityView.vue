<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
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
import UserTabs from '@/components/users/layouts/CurrentUserTabs'
import UserCommunityTabs from '@/components/users/layouts/UserCommunityTabs'

export default {
  name: 'CurrentUserCommunityView',
  components: { UserCommunityTabs, UserTabs, Spinner },
  mixins: [CurrentUserConcern],

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.community')
    }
  }
}
</script>
