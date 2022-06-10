<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-else>
      <v-container class-name="dashboard-container">
        <user-head :user="currentUser" />

        <!-- Get localization -->
        <client-only>
          <enable-localization class="mb-7" />

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

          <v-row class="mt-3">
            <v-col cols="12" md="6">
              <h3 class="mb-2">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiBookCheck }}
                </v-icon>
                Mon carnet
              </h3>
              <daily-ascents />
            </v-col>

            <!-- Crag, Gym and climbers around -->
            <v-col cols="12" md="6">
              <h3 class="mb-2">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiMapMarkerRadiusOutline }}
                </v-icon>
                Autour de moi
              </h3>
              <around-card :user="currentUser" />
            </v-col>
          </v-row>

          <v-row class="mt-7">
            <!-- Friends crosses -->
            <v-col cols="12" md="6" order-md="last">
              <h3>
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiAccountMultipleCheckOutline }}
                </v-icon>
                Les croix des copain·es
              </h3>
            </v-col>

            <v-col cols="12" md="6">
              <h3>
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiBullhornOutline }}
                </v-icon>
                Quoi de neuf ?
              </h3>
              <!-- Feed -->
              <feed feed-api="CurrentUserApi" />
            </v-col>
          </v-row>

          <!-- Right Side Drawer for crag routes -->
          <crag-route-drawer />
        </client-only>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mdiMapMarkerRadiusOutline, mdiBullhornOutline, mdiAccountMultipleCheckOutline, mdiBookCheck } from '@mdi/js'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserHead from '@/components/users/layouts/UserHead'
import EnablePartnerSearch from '@/components/users/notificationCard/EnablePartnerSearch'
import EnableLocalization from '@/components/users/notificationCard/EnableLocalization'
import BannerMissing from '@/components/users/notificationCard/BannerMissing'
import AvatarMissing from '@/components/users/notificationCard/AvatarMissing'
import AroundCard from '@/components/users/AroundCard'
import Feed from '@/components/feeds/Feed'
import DailyAscents from '~/components/logBooks/outdoors/DailyAscents'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    DailyAscents,
    CragRouteDrawer,
    Feed,
    AroundCard,
    AvatarMissing,
    BannerMissing,
    EnableLocalization,
    EnablePartnerSearch,
    UserHead,
    Spinner
  },
  mixins: [CurrentUserConcern],

  data () {
    return {
      mdiMapMarkerRadiusOutline,
      mdiBullhornOutline,
      mdiAccountMultipleCheckOutline,
      mdiBookCheck
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
