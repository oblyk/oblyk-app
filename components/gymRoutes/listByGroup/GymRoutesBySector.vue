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
            v-if="item.sector.hasPolygon"
            icon
            :title="$t('components.gymSector.viewOnMap')"
            @click="setMapViewOnSector(item.sector.id)"
          >
            <v-icon>
              {{ mdiImageFilterCenterFocusStrong }}
            </v-icon>
          </v-btn>
          <gym-sector-admin-menu
            v-if="currentUserIsGymAdmin()"
            :gym-sector="item.sector"
          />
        </v-subheader>

        <template v-for="(route, routeIndex) in item.routes">
          <gym-route-list-item
            :key="`gym-route-card-${routeIndex}`"
            :gym-route="route"
            :show-sector="route.gym_sector_id === showSectorId"
          />
        </template>
      </v-list>

      <p v-if="item.routes.length === 0" class="text-center text--disabled">
        {{ $t('components.gymRoute.noRouteInSector') }}
      </p>

      <!-- Add route in sector -->
      <gym-route-add-in-sort-by-sector
        v-if="currentUserIsGymAdmin()"
        :gym-sector="item.sector"
      />
    </div>
  </div>
</template>

<script>
import { mdiTextureBox, mdiImageFilterCenterFocusStrong } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import GymRouteAddInSortBySector from '@/components/gymRoutes/partial/GymRouteAddInSortBySector'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import GymSectorAdminMenu from '~/components/gymSectors/GymSectorAdminMenu.vue'

export default {
  name: 'GymRoutesBySector',
  components: {
    GymSectorAdminMenu,
    GymRouteListItem,
    GymRouteAddInSortBySector
  },
  mixins: [SessionConcern],

  props: {
    sectors: {
      type: Array,
      required: true
    },
    getRoutes: {
      type: Function,
      default: null
    },
    showSectorId: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      mdiTextureBox,
      mdiImageFilterCenterFocusStrong
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
