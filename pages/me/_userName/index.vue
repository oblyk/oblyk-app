<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-else>
      <user-head :user="currentUser" />
      <current-user-tabs :user="currentUser" />
      <v-container class-name="dashboard-container">
        <!-- Get localization -->
        <client-only>
          <enable-localization class="mb-3" />

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
          <around-card :user="currentUser" />

          <!-- Configure my feed -->
          <setting-feed :user="currentUser" />

          <!-- Feed -->
          <feed feed-api="CurrentUserApi" />

          <!-- Right Side Drawer for crag routes -->
          <crag-route-drawer />
        </client-only>
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
import SettingFeed from '@/components/users/SettingFeed'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    SettingFeed,
    CragRouteDrawer,
    Feed,
    AroundCard,
    CurrentUserTabs,
    AvatarMissing,
    BannerMissing,
    EnableLocalization,
    EnablePartnerSearch,
    UserHead,
    Spinner
  },
  mixins: [CurrentUserConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
