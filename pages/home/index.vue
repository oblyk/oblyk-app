<template>
  <div>
    <spinner v-if="!currentUser" />

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
            v-if="currentUser.partner_search === null && !$auth.user.minor"
            :user="currentUser"
            class="mb-3"
          />

          <v-row class="mt-1 mt-md-3">
            <v-col cols="12" md="6">
              <h3 class="mb-2">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiBookCheck }}
                </v-icon>
                {{ $t('components.user.cardsTitle.myLogbook') }}
              </h3>
              <daily-ascents />
            </v-col>

            <!-- Crag, Gym and climbers around -->
            <v-col cols="12" md="6">
              <h3 class="mb-2 mt-4 mt-md-0">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiMapMarkerRadiusOutline }}
                </v-icon>
                {{ $t('components.user.cardsTitle.aroundMe') }}
              </h3>
              <around-card :user="currentUser" />
            </v-col>
          </v-row>

          <my-upcoming-contests
            class="mt-7"
          />

          <my-followed-gyms
            v-if="haveFollowedGyms"
            class="mt-7"
          />

          <my-partner-figures
            v-if="currentUser.partner_search"
            class="mt-7"
          />

          <v-row class="mt-7">
            <!-- Friends crosses -->
            <v-col cols="12" md="6" order-md="last">
              <h3 class="mb-2">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiAccountMultipleCheckOutline }}
                </v-icon>
                {{ $t('components.user.cardsTitle.subscribesAscents') }}
              </h3>
              <div>
                <subscribes-ascents-card
                  v-if="currentUser.user_subscribes_count > 0"
                  :user="currentUser"
                />
                <add-subscribes-card
                  v-else
                  :user="currentUser"
                />
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <h3 class="mt-4 mt-md-0">
                <v-icon
                  class="mr-2 mb-2"
                >
                  {{ mdiBullhornOutline }}
                </v-icon>
                {{ $t('components.user.cardsTitle.whatsNew') }}
              </h3>
              <!-- Feed -->
              <div v-intersect="loadFeed">
                <feed
                  v-if="feed"
                  feed-api="CurrentUserApi"
                />
              </div>
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
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import UserHead from '~/components/users/layouts/UserHead'
import EnablePartnerSearch from '~/components/users/notificationCard/EnablePartnerSearch'
import EnableLocalization from '~/components/users/notificationCard/EnableLocalization'
import BannerMissing from '~/components/users/notificationCard/BannerMissing'
import AvatarMissing from '~/components/users/notificationCard/AvatarMissing'
import AroundCard from '~/components/users/AroundCard'
import DailyAscents from '~/components/logBooks/outdoors/DailyAscents'
import SubscribesAscentsCard from '~/components/users/SubscribesAscentsCard'
import AddSubscribesCard from '~/components/users/AddSubscribesCard'
import MyPartnerFigures from '~/components/users/MyPartnerFigures'
import MyUpcomingContests from '~/components/users/MyUpcomingContests'
import MyFollowedGyms from '~/components/users/MyFollowedGyms'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')
const Feed = () => import('~/components/feeds/Feed')

export default {
  components: {
    MyFollowedGyms,
    MyUpcomingContests,
    MyPartnerFigures,
    AddSubscribesCard,
    SubscribesAscentsCard,
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
  middleware: ['auth'],

  data () {
    return {
      feed: false,

      mdiMapMarkerRadiusOutline,
      mdiBullhornOutline,
      mdiAccountMultipleCheckOutline,
      mdiBookCheck
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mon profil Oblyk'
      },
      en: {
        metaTitle: 'My Oblyk profile'
      }
    }
  },

  computed: {
    haveFollowedGyms () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.subscribes.filter(subscribe => subscribe.followable_type === 'Gym').length > 0
      } else {
        return true
      }
    }
  },

  methods: {
    loadFeed (entries, observer) {
      if (entries[0].isIntersecting) {
        this.feed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  max-width: 900px;
}
</style>
