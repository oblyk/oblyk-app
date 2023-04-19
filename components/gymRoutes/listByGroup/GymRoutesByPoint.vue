<template>
  <div>
    <gym-route-list-item
      v-for="(route, routeIndex) in routes"
      :key="`gym-route-card-${routeIndex}`"
      :gym-route="route"
      class="mb-1"
    />
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'

export default {
  name: 'GymRoutesByPoint',
  components: { GymRouteListItem },
  mixins: [DateHelpers, GradeMixin],
  props: {
    routes: {
      type: Array,
      required: true
    },
    getRoutes: {
      type: Function,
      default: null
    }
  }
}
</script>
