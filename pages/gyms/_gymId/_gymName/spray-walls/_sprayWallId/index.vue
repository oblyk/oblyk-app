<template>
  <div style="background-color: rgb(40,40,40)">
    <div
      class="spray-wall-interface"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
    >
      <div
        class="spray-wall-picture"
        :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
      >
        <spray-wall-route-viewer
          v-if="!loadingSprayWall"
          ref="sprayWallRouteViewer"
          :gym="gym"
          clickable
          :spray-wall="sprayWall"
          :spray-wall-route="sprayWallRoute || hoverSprayWallRoute"
          :selected-hold-callback="selectHoldCallback"
        />
        <div
          v-else
          class="spray-wall-viewer-loader full-height d-flex justify-center align-center"
        >
          <div class="text-center">
            <animate-oblyk-logo color="white" animate />
            <p class="mb-0 white--text">
              {{ $t('common.loading') }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="spray-wall-left-side"
        :class="leftSideClass"
      >
        <v-sheet class="rounded-tl rounded-tr">
          <h3 class="px-2 py-1 border-bottom mb-1">
            <v-icon left color="primary">
              {{ oblykSprayWall }}
            </v-icon>
            {{ sprayWall?.name || '...' }}
          </h3>
          <gym-space-selector
            :gym="gym"
            :selected-spray-wall-id="$route.params.sprayWallId"
          />
          <div v-if="!loadingSprayWall">
            <div class="pa-1">
              <v-btn
                block
                outlined
                color="deep-purple accent-3"
                :to="`${sprayWall.app_path}/spray-wall-routes/new`"
              >
                <v-icon left>
                  {{ oblykAddHold }}
                </v-icon>
                {{ $t('actions.suggestAProblem') }}
              </v-btn>
              <v-alert
                v-if="sprayWall.draft"
                text
                color="warning"
                class="mt-2"
              >
                {{ $t('components.sprayWall.draft') }}
              </v-alert>
            </div>
            <spray-wall-routes-list
              ref="sprayWallRoutesList"
              :spray-wall="sprayWall"
              :gym="gym"
              :on-mouse-enter-callback="sprayWallRouteOnMouseEnter"
              :on-mouse-leave-callback="sprayWallRouteOnMouseLeave"
              :change-filters-callback="onChangeFilters"
            />
          </div>
        </v-sheet>
      </div>
    </div>
    <down-to-close-dialog
      ref="SprayWallRouteDialog"
      v-model="sprayWallRouteDialog"
      padding-x="px-2"
      :close-callback="closeSprayWallRouteModal"
      wait-signal
      environment="indoor"
    >
      <spray-wall-route-info
        v-if="!loadingSprayWallRoute && sprayWallRoute"
        :gym="gym"
        :spray-wall-route="sprayWallRoute"
        :push-filter-callback="pushSprayWallRoutesFilter"
      />
    </down-to-close-dialog>
  </div>
</template>

<script>
import { oblykSprayWall, oblykAddHold } from 'assets/oblyk-icons'
import OblykApi from '@/services/oblyk-api/OblykApi'
import SprayWallRoutesList from '~/components/sprayWallRoutes/SprayWallRoutesList'
import SprayWallRouteViewer from '~/components/sprayWallRoutes/SprayWallRouteViewer'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import SprayWallRouteInfo from '~/components/sprayWallRoutes/SprayWallRouteInfo'
import GymSpaceSelector from '~/components/gymSpaces/GymSpaceSelector'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo'

export default {
  components: {
    AnimateOblykLogo,
    GymSpaceSelector,
    SprayWallRouteInfo,
    DownToCloseDialog,
    SprayWallRouteViewer,
    SprayWallRoutesList
  },
  scrollToTop: true,

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sprayWall: null,
      loadingSprayWall: true,
      hoverSprayWallRoute: null,
      sprayWallRoute: null,
      sprayWallRouteDialog: false,
      loadingSprayWallRoute: true,

      oblykSprayWall,
      oblykAddHold
    }
  },

  computed: {
    leftSideClass () {
      const leftClass = []
      if (this.$vuetify.breakpoint.mobile) {
        leftClass.push('--mobile-interface')
      } else {
        leftClass.push('--desktop-interface sheet-background-color')
      }
      return leftClass.join(' ')
    },

    activeSprayWallRouteGymRouteId () {
      return this.$route.query.spray_wall_route
    }
  },

  watch: {
    activeSprayWallRouteGymRouteId () {
      if (this.activeSprayWallRouteGymRouteId) {
        this.getSprayWallRoute()
      } else if (this.$refs.SprayWallRouteDialog) {
        this.$refs.SprayWallRouteDialog.close()
      } else {
        this.sprayWallRoute = null
      }
    },

    '$route.params.sprayWallId' () {
      this.getSprayWall()
    }
  },

  mounted () {
    this.getSprayWall()
    const urlParams = new URLSearchParams(window.location.search)
    const sprayWallRoute = urlParams.get('spray_wall_route')
    if (sprayWallRoute) {
      this.getSprayWallRoute(sprayWallRoute)
    }
  },

  methods: {
    getSprayWall () {
      this.loadingSprayWall = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
        })
        .finally(() => {
          this.loadingSprayWall = false
        })
    },

    getSprayWallRoute () {
      this.loadingSprayWallRoute = true
      this.sprayWallRouteDialog = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/spray_walls/${this.$route.params.sprayWallId}/spray_wall_routes/${this.activeSprayWallRouteGymRouteId}`)
        .then((resp) => {
          this.sprayWallRoute = resp.data
          this.$refs.SprayWallRouteDialog?.signal()
        })
        .catch(() => {
          this.sprayWallRouteDialog = false
        })
        .finally(() => {
          this.loadingSprayWallRoute = false
        })
    },

    sprayWallRouteOnMouseEnter (sprayWallRoute) {
      this.hoverSprayWallRoute = sprayWallRoute
    },

    sprayWallRouteOnMouseLeave () {
      this.hoverSprayWallRoute = null
    },

    closeSprayWallRouteModal () {
      this.sprayWallRoute = null
      this.sprayWallRouteDialog = false
      this.$router.push({ path: this.$route.path })
    },

    pushSprayWallRoutesFilter (filter) {
      this.$refs.sprayWallRoutesList.pushFilter(filter)
    },

    selectHoldCallback (hold) {
      const filter = {
        type: 'spray_wall_hold',
        value: hold.id,
        text: 'Prise',
        icon: hold
      }
      this.$refs.sprayWallRoutesList.pushFilter(filter)
    },

    onChangeFilters (filters) {
      if (!filters.some(filter => filter.type === 'spray_wall_hold')) {
        this.$refs.sprayWallRouteViewer.unselectedHold()
      }
    }
  }
}
</script>

<style lang="scss">
.spray-wall-interface {
  position: relative;
  width: 100%;
  &.--desktop-interface { height: calc(100vh - 128px); }

  .spray-wall-left-side {
    position: relative;
    &.--desktop-interface {
      width: 450px;
      height: calc(100vh - 128px);
      overflow-y: auto;
      margin-top: 0;
      .spray-wall-problems {
        width: 450px;
      }
    }
    &.--mobile-interface {
      width: 100%;
      margin-top: calc(100vh - 322px);
    }
  }

  .spray-wall-picture {
    width: 100%;
    &.--desktop-interface {
      height: 100%;
      position: absolute;
      padding-left: 450px;
    }
    &.--mobile-interface {
      height: calc(100vh - 321px);
      position: fixed;
      top: 63px;
      right: 0;
    }
  }
}
</style>
