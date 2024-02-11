<template>
  <div
    class="d-flex"
    @click="click"
  >
    <v-avatar
      v-if="route.thumbnail"
      size="32"
      rounded
      class="flex-grow-0 mr-3"
    >
      <v-img :src="route.thumbnailUrl" />
    </v-avatar>
    <div class="d-flex align-self-center">
      <div class="mr-auto">
        <gym-route-tag-and-hold :gym-route="route" />
        {{ route.name }}
      </div>
      <div
        v-if="route.grade_to_s"
        class="ml-1 font-weight-bold"
        style="padding-top: 2px"
      >
        {{ route.grade_to_s }}
      </div>
    </div>
  </div>
</template>

<script>
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRoute from '~/models/GymRoute'

export default {
  name: 'GymRouteSimpleItem',
  components: {
    GymRouteTagAndHold
  },

  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      route: new GymRoute({ attributes: this.gymRoute })
    }
  },

  methods: {
    click () {
      if (this.callback) {
        this.callback(this.route)
      }
    }
  }
}
</script>
