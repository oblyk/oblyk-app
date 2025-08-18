<template>
  <div
    class="gym-spaces-interface"
    :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
  >
    <!-- Space List or 3D -->
    <div
      v-if="!$vuetify.breakpoint.mobile || (gym && gym.representation_type === '3d')"
      class="gym-spaces-plan"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
    >
      <client-only>
        <gym-space-list
          v-if="gym && gym.representation_type === '2d_picture'"
          :gym="gym"
          class="px-4 pb-4 pt-2"
        />
        <gym-three-d
          v-if="gym && gym.representation_type === '3d'"
          class="full-height sheet-background-color"
          :gym="gym"
        />
      </client-only>
    </div>

    <!-- Gym is loaded -->
    <div
      v-if="gym"
      class="gym-spaces-left-side border-right"
      :class="gymSpacesLeftSideClass"
    >
      <!-- Spaces informations and routes -->
      <v-sheet
        :elevation="$vuetify.breakpoint.mobile ? 24 : 0"
        class="gym-spaces-card"
        :class="$vuetify.breakpoint.mobile ? 'rounded' : ''"
      >
        <div
          v-if="$vuetify.breakpoint.mobile"
          class="spaces-scroll-encourage"
        >
          <div />
        </div>

        <div class="d-flex border-bottom pl-3">
          <h3>
            {{ $t('components.gym.guidebook') }}
          </h3>
          <v-spacer />
          <client-only>
            <gym-spaces-action-menu
              v-if="gym && $auth.loggedIn && (currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening')))"
              :gym="gym"
            />
          </client-only>
        </div>

        <div class="pa-2">
          <gym-space-selector :gym="gym" />

          <contest-up-coming
            v-if="gym.upcoming_contests.length > 0"
            :gym="gym"
          />
        </div>

        <div class="px-2">
          <!-- Route list -->
          <client-only>
            <gym-space-route-list
              :gym="gym"
              :show-plan-options="false"
            />
          </client-only>
        </div>
      </v-sheet>

      <div
        v-show="!$vuetify.breakpoint.mobile && (loadingGymRoute || gymRoute)"
        class="gym-route-on-desktop-container"
      >
        <div class="gym-route-on-desktop-card py-1 pl-1">
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
      </div>
    </div>

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
  </div>
</template>

<script>
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import Spinner from '~/components/layouts/Spiner'
import GymSpaceRouteList from '~/components/gymRoutes/GymSpaceRouteList'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import GymSpaceSelector from '~/components/gymSpaces/GymSpaceSelector'
const GymSpacesActionMenu = () => import('~/components/gymSpaces/GymSpacesActionMenu')
const ContestUpComing = () => import('~/components/gyms/ContestUpComing')
const GymSpaceList = () => import('~/components/gymSpaces/GymSpaceList')
const GymThreeD = () => import('~/components/gyms/GymThreeD')

export default {
  components: {
    GymSpaceSelector,
    GymSpacesActionMenu,
    GymThreeD,
    DownToCloseDialog,
    ContestUpComing,
    GymRouteInfo,
    GymSpaceList,
    GymSpaceRouteList,
    Spinner
  },
  mixins: [GymRolesHelpers],
  scrollToTop: true,
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      gymRoute: null,
      gymRouteDialog: false,
      loadingGymRoute: false
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    },

    gymSpacesLeftSideClass () {
      const classes = []
      if (this.$vuetify.breakpoint.mobile) {
        classes.push('--mobile-interface sheet-background-color')
      } else {
        classes.push('--desktop-interface')
      }
      classes.push(`--${this.gym?.representation_type}`)
      if (this.gymRoute !== null || this.loadingGymRoute) {
        classes.push('--with-active-gym-route')
      }
      return classes.join(' ')
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

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.gym.path, page: this.$route.path })
  },

  mounted () {
    if (this.activeGymRouteId) {
      this.getGymRoute()
    }
  },

  methods: {
    async getGymRoute () {
      this.loadingGymRoute = true
      this.gymRoute = null
      this.gymRouteDialog = true

      // Get route in indexDb first and get in API if it does not exist
      const localRoute = await this.$localforage.gymRoutes.getItem(this.activeGymRouteId)
      if (localRoute) {
        this.gymRoute = new GymRoute({ attributes: localRoute })
        this.$refs.GymRouteDialog?.signal()
        this.loadingGymRoute = false
      } else {
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
      }
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
  position: relative;
  width: 100%;
  &.--desktop-interface { height: calc(100vh - 128px); }
  &.--mobile-interface { height: calc(100vh - 43px); }

  .gym-space-info-and-routes {
    height: 100%;
    overflow-y: auto;
  }

  .gym-spaces-left-side {
    height: 100%;
    position: relative;
    &.--desktop-interface {
      width: 450px;
      height: calc(100vh - 128px);
      overflow-y: auto;
      margin-top: 0;
      &.--with-active-gym-route {
        width: 900px;
      }
      .gym-spaces-card {
        width: 100%;
        min-height: calc(100vh - 128px);
      }
      .gym-spaces-info-and-routes {
        width: 450px;
      }
    }
    &.--mobile-interface {
      width: 100%;
      &.--3d { margin-top: calc(100vh - 313px); }
      .gym-spaces-card { min-height: calc(100vh - 44px); }
      .gym-spaces-info-and-routes { padding-bottom: 45px; }
    }

    .gym-route-on-desktop-container {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 450px;
      overflow: hidden;
      z-index: 5;
      .gym-route-on-desktop-card {
        position: fixed;
        height: 100%;
        width: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        .gym-route-card {
          min-height: 100%;
        }
      }
    }
  }
  .spaces-scroll-encourage {
    padding-top: 5px;
    div {
      margin-left: auto;
      margin-right: auto;
      width: 30px;
      height: 5px;
      border-radius: 3px;
      background-color: rgb(155, 155, 155, 0.3);
    }
  }
}

.gym-spaces-plan {
  width: 100%;
  &.--desktop-interface {
    height: 100%;
    position: absolute;
    padding-left: 450px;
  }
  &.--mobile-interface {
    height: calc(100vh - 312px);
    position: fixed;
    top: 63px;
    right: 0;
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
</style>
