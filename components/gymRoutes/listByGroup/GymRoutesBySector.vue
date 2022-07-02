<template>
  <div>
    <div
      v-for="(item, index) in sectors"
      :key="`sector-${index}`"
      class="mb-5"
      @mouseenter="$root.$emit('activeSector', item.sector.id)"
    >
      <!-- Sector head -->
      <gym-route-sort-by-sector :gym-sector="item.sector" />

      <!-- Route card -->
      <gym-route-card
        v-for="(route, index) in item.routes"
        :key="`gym-route-card-${route.id}`"
        :placement="placement(index, item.routes.length)"
        :gym-route="route"
        :get-space-routes="getRoutes"
      />

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
import GymRouteSortBySector from '@/components/gymRoutes/partial/GymRouteSortBySector'
import GymRouteCard from '@/components/gymRoutes/GymRouteCarde'
import GymRouteAddInSortBySector from '@/components/gymRoutes/partial/GymRouteAddInSortBySector'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymRoutesBySector',
  mixins: [SessionConcern],
  components: { GymRouteAddInSortBySector, GymRouteCard, GymRouteSortBySector },
  props: {
    sectors: Array,
    getRoutes: Function,
    placement: Function
  }
}
</script>
