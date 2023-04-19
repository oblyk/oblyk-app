<template>
  <div>
    <div
      v-for="(item, index) in levels"
      :key="`level-index-${index}`"
      class="mb-6"
    >
      <v-list
        color="rgba(0, 0, 0, 0)"
        subheader
        two-line
      >
        <v-subheader class="font-weight-bold mb-1 px-0 border-bottom">
          <v-icon
            v-for="(color, colorIndex) in item.colors"
            :key="`color-index-${colorIndex}`"
            left
            :color="color"
          >
            {{ mdiBookmark }}
          </v-icon>
          {{ item.name }}
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
import { mdiBookmark } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'

export default {
  name: 'GymRoutesByLevel',
  components: { GymRouteListItem },
  mixins: [DateHelpers, GradeMixin],
  props: {
    levels: {
      type: Array,
      required: true
    },
    getRoutes: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mdiBookmark
    }
  }
}
</script>
