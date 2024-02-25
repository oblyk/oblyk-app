<template>
  <!-- Gym space -->
  <div class="gym-space-interface">
    <!-- Plan area -->
    <div
      class="gym-space-plan"
      :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
    >
      <client-only>
        <gym-space-plan
          v-if="gymSpace && gymSpace.plan"
          :gym-space="gymSpace"
        />
        <gym-space-plan-missing
          v-if="gymSpace && !gymSpace.plan"
          :gym-space="gymSpace"
          :gym="gymSpace.gym"
        />
        <p
          v-if="!gymSpace"
          class="text-center text--disabled mt-5"
        >
          {{ $t('models.gymSpace.loading') }}
        </p>
      </client-only>
    </div>

    <!-- Space information and routes -->
    <div
      class="gym-space-left-side"
      :class="leftSideClass"
    >
      <!-- Space information and routes -->
      <div class="gym-space-info-and-routes">
        <v-sheet
          v-if="!gymSpace"
          class="rounded pa-4 ma-4"
          style="height: calc(100vh - 100px)"
        >
          <v-skeleton-loader type="sentences, avatar" />
        </v-sheet>
        <gym-space-info-and-routes
          v-if="gymSpace && gym"
          :gym-space="gymSpace"
          :gym="gym"
        />
      </div>

      <!-- Open gym route in right side of info in desktop interface -->
      <div
        v-if="!$vuetify.breakpoint.mobile && (loadingGymRoute || gymRoute)"
        class="gym-route-on-desktop-container py-3"
      >
        <div class="gym-route-on-desktop-card">
          <v-card class="gym-route-card">
            <spinner v-if="loadingGymRoute" />
            <gym-route-info
              v-if="gymRoute"
              :gym-route="gymRoute"
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
        :close-callback="closeGymRouteModal"
        :gym-route="gymRoute"
        :gym="gym"
      />
    </down-to-close-dialog>
  </div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceInfoAndRoutes from '~/components/gymSpaces/GymSpaceInfoAndRoutes'
import Gym from '~/models/Gym'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import Spinner from '~/components/layouts/Spiner'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
const GymRouteInfo = () => import('~/components/gymRoutes/GymRouteInfo')
const GymSpacePlan = () => import('@/components/gymSpaces/GymSpacePlan')
const GymSpacePlanMissing = () => import('@/components/gymSpaces/GymSpacePlanMissing')

export default {
  meta: { orphanRoute: true },
  components: {
    DownToCloseDialog,
    Spinner,
    GymSpaceInfoAndRoutes,
    GymRouteInfo,
    GymSpacePlanMissing,
    GymSpacePlan
  },
  mixins: [GymSpaceConcern],

  data () {
    return {
      gym: null,
      gymRoute: null,
      gymRouteDialog: false,
      loadingGymRoute: false,

      mdiChevronDown
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    },

    leftSideClass () {
      const leftClass = []
      if (this.$vuetify.breakpoint.mobile) {
        leftClass.push('mobile-interface')
      } else {
        leftClass.push('desktop-interface')
      }

      if (this.gymRoute !== null || this.loadingGymRoute) {
        leftClass.push('--with-active-gym-route')
      }
      return leftClass.join(' ')
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
    this.getGym(true)
  },

  methods: {
    getGym (loadRouteAfter = false) {
      new GymApi(this.$axios, this.$auth)
        .find(this.$route.params.gymId)
        .then((resp) => {
          this.gym = new Gym({ attributes: resp.data })
          if (loadRouteAfter && this.activeGymRouteId) {
            this.getGymRoute()
          }
        })
    },

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
.gym-space-interface {
  .gym-space-left-side {
    z-index: 1;
    position: relative;
    &.desktop-interface {
      width: 450px;
      margin-top: 0;
      &.--with-active-gym-route {
        width: 900px;
      }
      .gym-space-info-and-routes {
        width: 450px;
      }
    }
    &.mobile-interface {
      width: 100%;
      margin-top: calc(100vh - 260px);
      .gym-space-info-and-routes {
        padding-bottom: 45px;
      }
    }

    .gym-route-on-desktop-container {
      position: absolute;
      top: 0;
      right: 0;
      height: calc(100vh - 64px);
      width: 450px;
      overflow: hidden;
      .gym-route-on-desktop-card {
        position: fixed;
        height: calc(100vh - 85px);
        top: 75px;
        width: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        .gym-route-card {
          min-height: 100%;
          backdrop-filter: blur(10px);
        }
      }
    }
  }

  .gym-space-plan {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: calc(100vh - 45px);
    &.desktop-interface {
      top: 64px;
      width: calc(100vw - 300px);
      height: calc(100vh - 64px);
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
