<template>
  <div>
    <spinner v-if="!currentUser" />

    <div v-else>
      <v-container class-name="dashboard-container">
        <user-head :user="currentUser" />

        <!-- Get localization -->
        <client-only>
          <div class="text-right mt-n11 d-none d-md-block">
            <v-btn to="/outdoor" class="rounded-pill" text outlined>
              <v-icon left color="#31994e">
                {{ mdiTerrain }}
              </v-icon>
              Outdoor
            </v-btn>
            <v-btn to="/indoor" class="rounded-pill" text outlined>
              <v-icon left color="#743ad5">
                {{ oblykIndoor }}
              </v-icon>
              indoor
            </v-btn>
            <v-btn to="/community" class="rounded-pill" text outlined>
              <v-icon left color="#007b8b">
                {{ oblykPartner }}
              </v-icon>
              {{ $t('common.community') }}
            </v-btn>
          </div>
          <!-- Avatar missing -->
          <avatar-missing :user="currentUser" class="mb-3" />

          <!-- Banner missing -->
          <banner-missing :user="currentUser" class="mb-3" />

          <my-upcoming-contests class="mt-7" />

          <v-row class="mt-7">
            <!-- Friends crosses -->
            <v-col cols="12" md="6" order-md="last">
              <h3 class="mb-2">
                <v-icon
                  color="primary"
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
                  color="primary"
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
import { mdiBullhornOutline, mdiAccountMultipleCheckOutline, mdiTerrain } from '@mdi/js'
import { oblykPartner, oblykIndoor } from '~/assets/oblyk-icons'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import UserHead from '~/components/users/layouts/UserHead'
import BannerMissing from '~/components/users/notificationCard/BannerMissing'
import AvatarMissing from '~/components/users/notificationCard/AvatarMissing'
import SubscribesAscentsCard from '~/components/users/SubscribesAscentsCard'
import AddSubscribesCard from '~/components/users/AddSubscribesCard'
import MyUpcomingContests from '~/components/users/MyUpcomingContests'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')
const Feed = () => import('~/components/feeds/Feed')

export default {
  components: {
    MyUpcomingContests,
    AddSubscribesCard,
    SubscribesAscentsCard,
    CragRouteDrawer,
    Feed,
    AvatarMissing,
    BannerMissing,
    UserHead,
    Spinner
  },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      feed: false,

      mdiTerrain,
      mdiBullhornOutline,
      mdiAccountMultipleCheckOutline,
      oblykPartner,
      oblykIndoor
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
