<template>
  <v-navigation-drawer
    v-model="localityDrawer"
    class="locality-user-drawer"
    temporary
    absolute
    right
  >
    <v-skeleton-loader
      v-if="loadingLocality"
      type="article"
    />

    <!-- Locality information -->
    <div v-else>
      <v-list>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              {{ locality.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ locality.region }}, {{ locality.country }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-bold">
              {{ $tc('common.climbers.long', locality.partner_search_users_count, { count: locality.partner_search_users_count }) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              large
              icon
              @click="closeDrawer()"
            >
              <v-icon large>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>

    <!-- Climbers list -->
    <div
      v-if="!loadingLocality && $auth.loggedIn"
      class="px-4"
    >
      <locality-user-filter
        v-model="filters"
        class="mt-2"
        bg-color="back-app-color"
        :elevation="0"
      />

      <div
        v-for="(climberLocality, climberIndex) in climbers"
        :key="`climber-index-${climberIndex}`"
      >
        <locality-user-card
          :climber-locality="climberLocality"
        />
      </div>
      <loading-more
        :get-function="getClimbers"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />
    </div>

    <!-- If no climbers -->
    <p
      v-if="climbers.length === 0 && !loadingClimbers"
      class="text--disabled text-center my-5"
    >
      {{ $t('common.pages.partner.emptyClimbersWithFilter') }}
    </p>

    <!-- If no connected -->
    <v-sheet
      v-if="!loadingLocality && !$auth.loggedIn"
      class="pa-4 border rounded mt-5 mx-4 text-center"
    >
      <p v-html="$t('common.pages.partner.connectForMatch', { name: locality.name })" />
      <div>
        <v-btn
          elevation="0"
          color="primary"
          to="/sign-up"
        >
          {{ $t('actions.createFreeAccount') }}
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          text
          small
          color="primary"
          to="/about/partner-search"
        >
          {{ $t('common.pages.partner.howIsWork') }}
        </v-btn>
      </div>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose, mdiMagnify, mdiFilterOff } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LocalityApi from '~/services/oblyk-api/LocalityApi'
import Locality from '~/models/Locality'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import LocalityUserCard from '~/components/localityUsers/LocalityUserCard.vue'
import LocalityUser from '~/models/LocalityUser'
import LocalityUserFilter from '~/components/localityUsers/LocalityUserFilter.vue'

export default {
  name: 'LocalityUserDrawer',
  components: {
    LocalityUserFilter,
    LocalityUserCard,
    LoadingMore
  },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      localityDrawer: false,
      locality: null,
      loadingLocality: true,
      loadingClimbers: true,
      climbers: [],
      filters: {
        partnerSearch: false,
        climbingType: null,
        level: null
      },

      mdiClose,
      mdiMagnify,
      mdiFilterOff
    }
  },

  computed: {
    localityId () {
      return this.$route.query.locality
    }
  },

  watch: {
    localityId () {
      if (this.localityId) {
        this.getLocality()
      }
    },

    localityDrawer () {
      if (this.localityDrawer === false && this.localityId) {
        this.closeDrawer()
      }
    },

    filters: {
      handler () {
        this.getClimbers(true)
      },
      deep: true
    }
  },

  mounted () {
    if (this.localityId) {
      this.getLocality()
    }
  },

  methods: {
    getLocality () {
      this.localityDrawer = true
      this.loadingLocality = true
      this.loadingClimbers = true
      this.climbers = []
      this.resetLoadMorePageNumber()
      new LocalityApi(this.$axios, this.$auth)
        .find(this.localityId)
        .then((resp) => {
          this.locality = new Locality({ attributes: resp.data })
          if (this.$auth.loggedIn) {
            this.getClimbers(true)
          }
        })
        .finally(() => {
          this.loadingLocality = false
        })
    },

    getClimbers (reload = false) {
      this.moreIsBeingLoaded()
      if (reload) {
        this.resetLoadMorePageNumber()
        this.loadingClimbers = true
        this.climbers = []
      }
      new LocalityApi(this.$axios, this.$auth)
        .climbers(this.localityId, this.filters, this.page)
        .then((resp) => {
          for (const climberLocality of resp.data) {
            const localityUser = new LocalityUser({ attributes: climberLocality })
            this.climbers.push(localityUser)
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingClimbers = false
          this.finallyMoreIsLoaded()
        })
    },

    closeDrawer () {
      this.localityDrawer = false
      this.$router.push(this.$route.path)
    }
  }
}
</script>

<style lang="scss">
.locality-user-drawer {
  width: 700px !important;
  max-width: calc(100vw - 50px);
  position: fixed;
  height: 100vh !important;
  &.v-navigation-drawer {
    z-index: 300;
  }
}

.theme--light {
  .locality-user-drawer {}
}
</style>
