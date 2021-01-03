<template>
  <div>
    <div
      @mouseenter="$root.$emit('activeSector', gymRoute.gym_sector_id)"
      @click="changeCardSize()"
    >
      <gym-route-card-small
        :gym-route="gymRoute"
        v-if="!showLargeCard"
      />
    </div>

    <gym-route-card-large
      @mouseenter="$root.$emit('activeSector', gymRoute.gym_sector_id)"
      :gym-route-prop="gymRoute"
      :change-card-size="changeCardSize"
      :get-space-routes="getSpaceRoutes"
      v-if="showLargeCard"
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
    gymRoute: Object,
    getSpaceRoutes: Function
  },

  data () {
    return {
      showLargeCard: false
    }
  },

  methods: {
    changeCardSize: function () {
      this.showLargeCard = !this.showLargeCard
    }
  }
}
</script>
