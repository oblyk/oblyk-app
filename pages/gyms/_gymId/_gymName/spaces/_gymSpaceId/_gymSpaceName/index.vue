<template>
  <div
    v-if="gymSpace"
    class="gym-spaces-interface"
  >
    <!-- Plan area -->
    <div
      class="gym-space-plan"
      :class="$vuetify.breakpoint.mobile ? 'mobil-interface' : 'desktop-interface'"
    >
      <client-only>
        <gym-space-plan v-if="gymSpace.plan" :gym-space="gymSpace" />
        <gym-space-plan-missing v-else :gym-space="gymSpace" />
      </client-only>
    </div>

    <!-- Space informations and routes -->
    <div
      class="gym-space-left-side"
      :class="leftSideClass"
    >
      <!-- Space informations and routes -->
      <div class="gym-space-info-and-routes">
        <gym-space-info-and-routes
          :gym-space="gymSpace"
          :gym="gym"
        />
      </div>

      <!-- Open gym route in right side of info in desktop interface -->
      <v-slide-x-transition>
        <div
          v-if="!$vuetify.breakpoint.mobile"
          v-show="loadingGymRoute || gymRoute"
          class="gym-route-on-desktop-container py-3"
        >
          <div class="gym-route-on-desktop-card">
            <v-card class="gym-route-card">
              <spinner v-if="loadingGymRoute" />
              <gym-route-info
                v-if="gymRoute"
                :gym-route="gymRoute"
              />
            </v-card>
          </div>
        </div>
      </v-slide-x-transition>
    </div>

    <!-- Open gym route in full screen on mobile -->
    <div
      v-if="(gymRoute || loadingGymRoute) && $vuetify.breakpoint.mobile"
      class="gym-route-modal-on-mobile"
    >
      <v-dialog
        :value="true"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <spinner v-if="loadingGymRoute" />
          <gym-route-info
            v-if="gymRoute"
            :gym-route="gymRoute"
          />
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceInfoAndRoutes from '~/components/gymSpaces/GymSpaceInfoAndRoutes.vue'
import GymSpacePlanMissing from '@/components/gymSpaces/GymSpacePlanMissing'
import Gym from '~/models/Gym'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo.vue'
import Spinner from '~/components/layouts/Spiner.vue'
const GymSpacePlan = () => import('@/components/gymSpaces/GymSpacePlan')

export default {
  meta: { orphanRoute: true },
  components: {
    Spinner,
    GymRouteInfo,
    GymSpacePlanMissing,
    GymSpacePlan,
    GymSpaceInfoAndRoutes
  },
  mixins: [GymSpaceConcern],

  data () {
    return {
      gym: null,
      gymRoute: null,

      loadingGymRoute: false
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    },

    leftSideClass () {
      const leftClass = []
      if (this.$vuetify.breakpoint.mobile) {
        leftClass.push('mobil-interface')
      } else {
        leftClass.push('desktop-interface')
      }

      if (this.activeGymRouteId) {
        leftClass.push('--with-active-gym-route')
      }
      return leftClass.join(' ')
    }
  },

  watch: {
    activeGymRouteId () {
      if (this.activeGymRouteId) {
        this.getGymRoute()
      } else {
        this.gymRoute = null
      }
    }
  },

  mounted () {
    this.getGym()
    if (this.activeGymRouteId) {
      this.getGymRoute()
    }
  },

  methods: {
    getGym () {
      new GymApi(this.$axios, this.$auth)
        .find(this.$route.params.gymId)
        .then((resp) => {
          this.gym = new Gym({ attributes: resp.data })
        })
    },

    getGymRoute () {
      this.loadingGymRoute = true
      this.gymRoute = null
      new GymRouteApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId,
          this.activeGymRouteId
        ).then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
        }).finally(() => {
          this.loadingGymRoute = false
        })
    }
  }
}
</script>

<style lang="scss">
.gym-spaces-interface {
  max-width: 100vw;
  margin-left: 0;
  height: calc(100vh - 64px);
  position: relative;

  .gym-space-left-side {
    margin-top: calc(100vh - 160px);
    z-index: 1;
    position: relative;
    width: 100%;
    &.desktop-interface {
      &.--with-active-gym-route {
        width: 900px;
      }
      width: 450px;
      margin-top: 0;
      .gym-space-info-and-routes {
        width: 450px;
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
.theme--dark {
  .gym-route-card {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
}
.theme--light {
  .gym-route-card {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
}
</style>
