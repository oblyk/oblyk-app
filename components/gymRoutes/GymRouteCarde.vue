<template>
  <div>
    <gym-route-card-small
      v-if="!showLargeCard"
      :placement="placement"
      :gym-route="gymRoute"
      :callback="changeCardSize"
      @mouseenter="$root.$emit('activeSector', gymRoute.gym_sector_id)"
    />

    <gym-route-card-large
      v-if="showLargeCard"
      :gym-route-prop="gymRoute"
      :change-card-size="changeCardSize"
      :get-space-routes="getSpaceRoutes"
      @mouseenter="$root.$emit('activeSector', gymRoute.gym_sector_id)"
    />
  </div>
</template>
<script>
import GymRouteCardSmall from '@/components/gymRoutes/GymRouteCardSmall'
import GymRouteCardLarge from '@/components/gymRoutes/GymRouteCardLarge'

export default {
  name: 'GymRouteCard',
  components: { GymRouteCardLarge, GymRouteCardSmall },
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    getSpaceRoutes: {
      type: Function,
      default: null
    },
    placement: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      showLargeCard: false
    }
  },

  methods: {
    changeCardSize () {
      this.showLargeCard = !this.showLargeCard
    }
  }
}
</script>
