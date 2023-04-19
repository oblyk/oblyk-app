<template>
  <div>
    <div
      v-for="(item, index) in sectors"
      :id="`gym-route-sector-${item.sector.id}`"
      :key="`sector-${index}`"
      class="mb-5"
      @mouseenter="$root.$emit('activeSector', item.sector.id)"
    >
      <!-- Route List by sector -->
      <v-list
        color="rgba(0, 0, 0, 0)"
        subheader
        two-line
      >
        <v-subheader class="font-weight-bold mb-1 px-0 border-bottom">
          <v-icon left small class="mb-1">
            {{ mdiTextureBox }}
          </v-icon>
          {{ item.sector.name }}
          <v-spacer />
          <v-btn
            v-if="item.sector.hasPolygon && showPlanOptions"
            icon
            :title="$t('components.gymSector.viewOnMap')"
            @click="setMapViewOnSector(item.sector.id)"
          >
            <v-icon>
              {{ mdiImageFilterCenterFocusStrong }}
            </v-icon>
          </v-btn>
          <gym-sector-admin-menu
            v-if="currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening'))"
            :gym-sector="item.sector"
            :gym="gym"
            :show-plan-options="showPlanOptions"
          />
        </v-subheader>

        <template v-for="(route, routeIndex) in item.routes">
          <gym-route-list-item
            :key="`gym-route-card-${routeIndex}`"
            :gym-route="route"
            class="mb-1"
          />
        </template>
      </v-list>

      <p v-if="item.routes.length === 0" class="text-center text--disabled">
        {{ $t('components.gymRoute.noRouteInSector') }}
      </p>

      <!-- Add route in sector -->
      <div
        v-if="currentUserIsGymAdmin() && gymAuthCan(gym, 'manage_opening')"
        class="text-right"
      >
        <v-btn
          text
          color="primary"
          small
          :to="`${item.sector.path}/routes/new`"
        >
          <v-icon left>
            {{ mdiSourceBranchPlus }}
          </v-icon>
          {{ $t('actions.addLine') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiTextureBox, mdiImageFilterCenterFocusStrong, mdiSourceBranchPlus } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import GymSectorAdminMenu from '~/components/gymSectors/GymSectorAdminMenu.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymRoutesBySector',
  components: {
    GymSectorAdminMenu,
    GymRouteListItem
  },
  mixins: [SessionConcern, GymRolesHelpers],

  props: {
    sectors: {
      type: Array,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    getRoutes: {
      type: Function,
      default: null
    },
    showPlanOptions: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      mdiTextureBox,
      mdiImageFilterCenterFocusStrong,
      mdiSourceBranchPlus
    }
  },

  methods: {
    setMapViewOnSector (sectorId) {
      this.$root.$emit('setMapViewOnSector', sectorId)
      if (this.$vuetify.breakpoint.mobile) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
