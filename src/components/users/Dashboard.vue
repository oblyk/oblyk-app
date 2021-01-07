<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-else>
      <user-head :user="meUser" />
      <user-tabs :user="meUser" />
      <v-container class="dashboard-container">

        <!-- Get localization -->
        <enable-localization
          :user="meUser"
          class="mb-3"
        />

        <!-- Avatar missing -->
        <avatar-missing :user="meUser" />

        <!-- Banner missing -->
        <banner-missing :user="meUser" />

        <!-- Enable partner search -->
        <enable-partner-search
          v-if="meUser.partner_search === null"
          :user="meUser"
          class="mb-3"
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
import EnablePartnerSearch from '@/components/users/notificationCard/EnablePartnerSearch'
import EnableLocalization from '@/components/users/notificationCard/EnableLocalization'
import BannerMissing from '@/components/users/notificationCard/BannerMissing'
import AvatarMissing from '@/components/users/notificationCard/AvatarMissing'
export default {
  name: 'Dashboard',
  mixins: [MeUserConcern],
  components: { AvatarMissing, BannerMissing, EnableLocalization, EnablePartnerSearch, UserTabs, UserHead, Spinner }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
