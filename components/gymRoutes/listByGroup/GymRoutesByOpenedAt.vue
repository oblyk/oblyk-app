<template>
  <div>
    <div
      v-for="(item, index) in openedAts"
      :key="`opened-at-${index}`"
      class="mb-6"
    >
      <p class="mb-0">{{ humanizeDate(item.openedAt) }}</p>
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
    </div>
  </div>
</template>

<script>
import GymRouteCard from '@/components/gymRoutes/GymRouteCarde'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'GymRoutesByOpenedAt',
  mixins: [DateHelpers],
  components: { GymRouteCard },
  props: {
    openedAts: Array,
    getRoutes: Function,
    placement: Function
  }
}
</script>
