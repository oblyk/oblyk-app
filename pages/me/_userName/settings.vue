<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-settings-tabs :user="currentUser" />
      <router-view :user="currentUser" />
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserSettingsTabs from '@/components/users/layouts/UserSettingsTabs'

export default {
  components: { UserSettingsTabs, Spinner },
  mixins: [CurrentUserConcern],

  head () {
    return {
      title: this.$t('meta.currentUser.settings')
    }
  }
}
</script>
