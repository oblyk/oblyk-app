<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-else>
      <user-head :user="meUser" />
      <user-tabs :user="meUser" />
      <v-container class="dashboard-container">
        <enable-partner-search
          v-if="meUser.partner_search === null"
          :user="meUser"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { MeUserConcern } from '@/concerns/MeUserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'
import EnablePartnerSearch from '@/components/users/EnablePartnerSearch'
export default {
  name: 'Dashboard',
  mixins: [MeUserConcern],
  components: { EnablePartnerSearch, UserTabs, UserHead, Spinner }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
