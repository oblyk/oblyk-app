<template>
  <div>
    <div
      @mouseenter="$root.$emit('activeSector', gymRoute.gym_sector_id)"
      @click="changeCardSize()"
    >
      <gym-route-card-small
        v-if="!showLargeCard"
        :placement="placement"
        :gym-route="gymRoute"
      />
    </div>

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
    gymRoute: Object,
    getSpaceRoutes: Function,
    placement: {
      type: String,
      required: false
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
