<template>
  <div>
    <!-- Load Gym Space-->
    <v-container
      v-if="!gymSpace"
      class="mt-15"
    >
      <spinner :full-height="false" />
      <p class="text-center text--disabled">
        {{ $t('models.gymSpace.loading') }}
      </p>
    </v-container>

    <!-- Gym space -->
    <div
      v-else
      class="gym-space-interface"
    >
      <!-- Plan area -->
      <div
        class="gym-space-plan"
        :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
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
            v-if="gym"
            :gym-space="gymSpace"
            :gym="gym"
          />
        </div>

        <!-- Open gym route in right side of info in desktop interface -->
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
                :gym="gym"
              />
            </v-card>
          </div>
        </div>
      </div>

      <!-- Open gym route in full screen on mobile -->
      <div
        v-if="(gymRoute || loadingGymRoute) && $vuetify.breakpoint.mobile"
        class="gym-route-modal-on-mobile"
      >
        <v-dialog
          :value="true"
          transition="dialog-bottom-transition"
          content-class="gym-route-dialog"
          persistent
        >
          <v-card
            @touchstart="touchEvent('start', $event)"
            @touchend="touchEvent('end', $event)"
          >
            <spinner v-if="loadingGymRoute" />
            <gym-route-info
              v-if="gymRoute"
              :gym-route="gymRoute"
              :gym="gym"
            />
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceInfoAndRoutes from '~/components/gymSpaces/GymSpaceInfoAndRoutes.vue'
import Gym from '~/models/Gym'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo.vue'
import Spinner from '~/components/layouts/Spiner.vue'
const GymSpacePlan = () => import('@/components/gymSpaces/GymSpacePlan')
const GymSpacePlanMissing = () => import('@/components/gymSpaces/GymSpacePlanMissing')

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
      loadingGymRoute: false,
      closeDragStart: null,
      toucheClientY: 0,

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
    },

    closeGymRouteModal () {
      this.$router.push({ path: this.$route.path })
    },

    touchEvent (touchStatus, event) {
      const dialogue = document.querySelector('.gym-route-dialog')
      if (dialogue.scrollTop === 0 && touchStatus === 'start') {
        this.closeDragStart = true
        this.toucheClientY = event.changedTouches[0].clientY
      }
      if (touchStatus === 'end' && this.closeDragStart === true) {
        if (event.changedTouches[0].clientY - this.toucheClientY > 50) {
          this.closeGymRouteModal()
        }
      }
      if (touchStatus === 'end') {
        this.closeDragStart = null
        this.toucheClientY = null
      }
    }
  }
}
</script>

<style lang="scss">
.gym-space-interface {
  max-width: 100vw;
  margin-left: 0;
  height: calc(100vh - 64px);
  position: relative;

  .gym-space-left-side {
    margin-top: calc(100vh - 260px);
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
    &.mobile-interface {
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
