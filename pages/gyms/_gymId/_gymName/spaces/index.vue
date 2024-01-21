<template>
  <v-container fluid>
    <!-- Loading gym -->
    <div
      v-if="!gym"
      class="text-center mt-15"
    >
      <spinner :full-height="false" />
      <p class="text-center text--disabled">
        {{ $t('models.gymSpace.loading') }}
      </p>
    </div>

    <!-- Gym is loaded -->
    <v-row
      v-else
      class="gym-spaces-interface"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
    >
      <!-- Spaces informations and routes -->
      <v-col
        cols="12"
        md="5"
        lg="4"
        class="gym-space-info-and-routes"
      >
        <!-- Gym information -->
        <v-card
          dark
          class="mb-4"
        >
          <v-img
            height="150px"
            :src="gym.bannerUrl"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
          >
            <v-list-item
              dark
              class="mt-15 pt-3"
            >
              <v-list-item-avatar
                tile
                size="60"
              >
                <v-img
                  :src="gym.thumbnailLogoUrl"
                  class="rounded-sm"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h1
                    class="mb-n1 text-truncate"
                    style="color: white"
                  >
                    {{ gym.name }}
                  </h1>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <subscribe-btn
                    :subscribe-id="gym.id"
                    subscribe-type="Gym"
                    outlined
                    type-text
                    :small="true"
                  />
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  :to="gym.path"
                  large
                  exact-path
                >
                  <v-icon>
                    {{ mdiInformationOutline }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-img>
        </v-card>

        <!-- Space selector in mobile interface -->
        <v-sheet
          v-if="$vuetify.breakpoint.mobile"
          class="rounded pa-4 mb-4"
        >
          <!-- Space list -->
          <gym-space-selector
            :gym="gym"
          />
        </v-sheet>

        <gym-go-to-ranking
          :gym="gym"
          class="mb-4"
        />

        <div v-if="$vuetify.breakpoint.mobile && gym.upcoming_contests.length > 0">
          <contest-up-coming
            :gym="gym"
            class="mt-2 mb-3"
          />
        </div>

        <!-- Route list -->
        <v-sheet class="rounded px-4 pt-2 pb-4 mt-2">
          <h2
            v-if="!$vuetify.breakpoint.mobile"
            class="mb-2"
          >
            {{ $t('components.gym.guidebook') }}
          </h2>
          <p
            v-else
            class="mb-2"
          >
            <small class="text--disabled">
              {{ $t('components.gym.guidebook') }}
            </small>
          </p>
          <client-only>
            <gym-space-route-list
              :gym="gym"
              :show-plan-options="false"
            />
          </client-only>
        </v-sheet>
      </v-col>

      <!-- Spaces list or selected route -->
      <v-col
        v-if="!$vuetify.breakpoint.mobile"
        class="gym-spaces-list"
        cols="12"
        md="7"
        lg="8"
      >
        <!-- Open gym route in right side of info in desktop interface -->
        <div
          v-show="loadingGymRoute || gymRoute"
          class="gym-route-on-desktop-container"
        >
          <v-card class="gym-route-card">
            <spinner v-if="loadingGymRoute" />
            <gym-route-info
              v-if="gymRoute"
              :gym-route="gymRoute"
              :show-space="true"
              :gym="gym"
            />
          </v-card>
        </div>

        <!-- Gym Space Liste -->
        <div
          v-show="!(loadingGymRoute || gymRoute)"
        >
          <gym-space-list :gym="gym" />
          <contest-up-coming
            v-if="gym.upcoming_contests.length > 0"
            :gym="gym"
            class="mt-5"
          />
        </div>
      </v-col>

      <!-- Open gym route in full screen on mobile -->
      <down-to-close-dialog
        v-if="$vuetify.breakpoint.mobile"
        ref="GymRouteDialog"
        v-model="gymRouteDialog"
        padding-x="px-2"
        :close-callback="closeGymRouteModal"
        wait-signal
      >
        <gym-route-info
          v-if="!loadingGymRoute && gymRoute"
          :gym-route="gymRoute"
          :show-space="true"
          :gym="gym"
        />
      </down-to-close-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import Spinner from '~/components/layouts/Spiner'
import GymSpaceSelector from '~/components/gymSpaces/GymSpaceSelector'
import GymSpaceRouteList from '~/components/gymRoutes/GymSpaceRouteList'
import GymSpaceList from '~/components/gymSpaces/GymSpaceList'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo'
import SubscribeBtn from '~/components/forms/SubscribeBtn'
import GymGoToRanking from '~/components/gyms/GymGoToRanking'
import ContestUpComing from '~/components/gyms/ContestUpComing'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'

export default {
  components: {
    DownToCloseDialog,
    ContestUpComing,
    GymGoToRanking,
    SubscribeBtn,
    GymRouteInfo,
    GymSpaceList,
    GymSpaceRouteList,
    GymSpaceSelector,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [GymConcern],

  data () {
    return {
      gymRoute: null,
      gymRouteDialog: false,
      loadingGymRoute: false,
      closeDragStart: null,
      toucheClientY: 0,

      mdiInformationOutline
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    }
  },

  watch: {
    activeGymRouteId () {
      if (this.activeGymRouteId) {
        this.getGymRoute()
      } else if (this.$refs.GymRouteDialog) {
        this.$refs.GymRouteDialog.close()
      } else {
        this.gymRoute = null
      }
    }
  },

  mounted () {
    if (this.activeGymRouteId) {
      this.getGymRoute()
    }
  },

  methods: {
    getGymRoute () {
      this.loadingGymRoute = true
      this.gymRoute = null
      this.gymRouteDialog = true
      new GymRouteApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId,
          this.activeGymRouteId
        ).then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
          this.$refs.GymRouteDialog?.signal()
        }).finally(() => {
          this.loadingGymRoute = false
        })
    },

    closeGymRouteModal () {
      this.gymRoute = null
      this.gymRouteDialog = false
      this.$router.push({ path: this.$route.path })
    }
  }
}
</script>

<style lang="scss">
.gym-spaces-interface {
  &.--desktop-interface {
    height: calc(100vh - 64px);
  }
  &.--mobile-interface {
    height: calc(100vh - 43px);
  }

  .gym-space-info-and-routes {
    height: 100%;
    overflow-y: auto;
  }

  .gym-spaces-list {
    height: 100%;
    overflow-y: auto;
    .gym-route-on-desktop-container {
      max-width: 450px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .gym-route-card {}
    }
  }
}
.gym-route-dialog {
  width: 100%;
  height: 100%;
  max-height: 100% !important;
  margin: 0;
  overflow-x: hidden;
  .v-card {
    min-height: 100%;
  }
}
.theme--dark {
  .gym-route-card {
    background-color: rgba(17, 17, 17, 0.9) !important;
  }
}
.theme--light {
  .gym-route-card {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
}
</style>
