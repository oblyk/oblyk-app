<template>
  <div>
    <div @click="changeCardSize()">
      <gym-route-card-small
        :gym-route="gymRoute"
        v-if="!showLargeCard"
      />
    </div>

    <gym-route-card-large
      :gym-route-prop="gymRoute"
      :change-card-size="changeCardSize"
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
    gymRoute: Object
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
