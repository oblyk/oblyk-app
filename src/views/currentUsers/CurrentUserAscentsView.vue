<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <user-accents-tabs :user="currentUser" />
      <router-view :user="currentUser" />
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/CurrentUserTabs'
import UserAccentsTabs from '@/components/users/layouts/UserAscentsTabs'

export default {
  name: 'CurrentUserAscentsView',
  components: { UserAccentsTabs, UserTabs, Spinner },
  mixins: [CurrentUserConcern],

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.ascents')
    }
  }
}
</script>
