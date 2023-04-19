<template>
  <div>
    <div
      v-for="(item, index) in openedAts"
      :key="`opened-at-${index}`"
      class="mb-6"
    >
      <v-list
        color="rgba(0, 0, 0, 0)"
        subheader
        two-line
      >
        <v-subheader class="font-weight-bold mb-1 px-0 border-bottom">
          <v-icon left small class="mb-1">
            {{ mdiCalendar }}
          </v-icon>
          {{ humanizeDate(item.openedAt) }}
        </v-subheader>

        <template v-for="(route, routeIndex) in item.routes">
          <gym-route-list-item
            :key="`gym-route-card-${routeIndex}`"
            :gym-route="route"
            class="mb-1"
          />
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'

export default {
  name: 'GymRoutesByOpenedAt',
  components: { GymRouteListItem },
  mixins: [DateHelpers],
  props: {
    openedAts: {
      type: Array,
      required: true
    },
    getRoutes: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      mdiCalendar
    }
  }
}
</script>
