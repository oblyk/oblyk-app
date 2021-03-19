<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-else>
      <user-head :user="currentUser" />
      <current-user-tabs :user="currentUser" />
      <v-container class="dashboard-container">

        <!-- Get localization -->
        <enable-localization
          :user="currentUser"
          class="mb-3"
          :show-localization="false"
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

        <!-- Crag, Gym and climbers around -->
        <around-card
          :user="currentUser"
        />

        <!-- Feed -->
        <feed :user="currentUser" />

      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserHead from '@/components/users/layouts/UserHead'
import EnablePartnerSearch from '@/components/users/notificationCard/EnablePartnerSearch'
import EnableLocalization from '@/components/users/notificationCard/EnableLocalization'
import BannerMissing from '@/components/users/notificationCard/BannerMissing'
import AvatarMissing from '@/components/users/notificationCard/AvatarMissing'
import CurrentUserTabs from '@/components/users/layouts/CurrentUserTabs'
import AroundCard from '@/components/users/AroundCard'
import Feed from '@/components/feeds/Feed'

export default {
  name: 'Dashboard',
  mixins: [CurrentUserConcern],
  components: {
    Feed,
    AroundCard,
    CurrentUserTabs,
    AvatarMissing,
    BannerMissing,
    EnableLocalization,
    EnablePartnerSearch,
    UserHead,
    Spinner
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
