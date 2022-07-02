<template>
  <div>
    <div
      v-for="(item, index) in openedAts"
      :key="`opened-at-${index}`"
      class="mb-6"
    >
      <p class="mb-4">
        {{ humanizeDate(item.openedAt) }}
      </p>
      <div
        v-for="(route, routeIndex) in item.routes"
        :key="`gym-route-card-${route.id}`"
      >
        <!-- Route card -->
        <gym-route-card
          :placement="placement(routeIndex, item.routes.length)"
          :gym-route="route"
          :get-space-routes="getRoutes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GymRouteCard from '@/components/gymRoutes/GymRouteCarde'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'GymRoutesByOpenedAt',
  components: { GymRouteCard },
  mixins: [DateHelpers],
  props: {
    openedAts: {
      type: Array,
      required: true
    },
    getRoutes: {
      type: Function,
      required: true
    },
    placement: {
      type: Function,
      required: true
    }
  }
}
</script>
