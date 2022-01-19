<template>
  <div>
    <div
      v-for="(item, index) in sectors"
      :key="`sector-${index}`"
      @mouseenter="$root.$emit('activeSector', item.sector.id)"
      class="mb-5"
    >
      <!-- Sector head -->
      <gym-route-sort-by-sector :gym-sector="item.sector" />

      <div
        v-for="(route, index) in item.routes"
        :key="`gym-route-card-${route.id}`"
      >
        <!-- Route card -->
        <gym-route-card
          :placement="placement(index, item.routes.length)"
          :gym-route="route"
          :get-space-routes="getRoutes"
        />
      </div>

      <p v-if="item.routes.length === 0" class="text-center text--disabled">
        {{ $t('components.gymRoute.noRouteInSector') }}
      </p>

      <!-- Add route in sector -->
      <div v-if="currentUserIsGymAdmin()">
        <gym-route-add-in-sort-by-sector :gym-sector="item.sector" />
      </div>
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
