<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <user-settings-tabs :user="currentUser" />
      <router-view :user="currentUser" />
    </div>
  </div>
</template>
<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/CurrentUserTabs'
import UserSettingsTabs from '@/components/users/layouts/UserSettingsTabs'

export default {
  name: 'CurrentUserSettingsView',
  components: { UserSettingsTabs, UserTabs, Spinner },
  mixins: [CurrentUserConcern],

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.settings')
    }
  }
}
</script>
