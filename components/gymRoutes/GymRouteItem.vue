<template>
  <div
    class="d-inline-flex rounded-pill border hoverable"
    @click="click"
  >
    <v-avatar
      v-if="route.thumbnail"
      size="44"
      class="flex-grow-0"
    >
      <v-img :src="route.thumbnailUrl" />
    </v-avatar>
    <div class="align-self-center d-flex pr-4 ml-3">
      <gym-route-tag-and-hold
        :gym-route="route"
        :size="35"
        style="margin-top: 5px"
      />
      <div class="ml-1" style="padding-top: 1px">
        <div>
          <strong
            v-if="route.grade_to_s"
            class="font-weight-bold"
          >
            {{ route.grade_to_s }},
          </strong>
          {{ route.name }}
        </div>
        <div style="font-size: 0.75em">
          {{ route.gym_space_name }}, {{ route.gym_sector_name }}
        </div>
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
