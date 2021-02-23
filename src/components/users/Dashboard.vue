<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-else>
      <user-head :user="currentUser" />
      <user-tabs :user="currentUser" />
      <v-container class="dashboard-container">

        <!-- Get localization -->
        <enable-localization
          :user="currentUser"
          class="mb-3"
        />

        <!-- Avatar missing -->
        <avatar-missing :user="currentUser" class="mb-3" />

        <!-- Banner missing -->
        <banner-missing :user="currentUser" class="mb-3" />

        <!-- Enable partner search -->
        <enable-partner-search
          v-if="currentUser.partner_search === null"
          :user="currentUser"
          class="mb-3"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'
import EnablePartnerSearch from '@/components/users/notificationCard/EnablePartnerSearch'
import EnableLocalization from '@/components/users/notificationCard/EnableLocalization'
import BannerMissing from '@/components/users/notificationCard/BannerMissing'
import AvatarMissing from '@/components/users/notificationCard/AvatarMissing'
export default {
  name: 'Dashboard',
  mixins: [CurrentUserConcern],
  components: { AvatarMissing, BannerMissing, EnableLocalization, EnablePartnerSearch, UserTabs, UserHead, Spinner }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
