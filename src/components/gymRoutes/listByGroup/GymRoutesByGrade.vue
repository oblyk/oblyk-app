<template>
  <div>
    <div
      v-for="(item, index) in grades"
      :key="`opened-at-${index}`"
      class="mb-6"
    >
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
  name: 'GymRoutesByGrade',
  mixins: [DateHelpers],
  components: { GymRouteCard },
  props: {
    grades: Array,
    getRoutes: Function,
    placement: Function
  }
}
</script>
