<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-if="!loadingMeUser">
      <user-tabs :user="meUser" />
      <user-settings-tabs :user="meUser" />
      <router-view :user="meUser" />
    </div>
  </div>
</template>
<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'
import UserSettingsTabs from '@/components/users/layouts/UserSettingsTabs'

export default {
  name: 'SettingsView',
  components: { UserSettingsTabs, UserTabs, Spinner },
  mixins: [MeUserConcern]
}
</script>
