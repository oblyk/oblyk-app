<template>
  <div>
    <div
      v-for="(item, index) in grades"
      :key="`opened-at-${index}`"
      class="mb-6"
    >
      <v-list
        color="rgba(0, 0, 0, 0)"
        subheader
        two-line
      >
        <v-subheader class="font-weight-bold mb-1 px-0 border-bottom">
          <v-icon
            left
            small
            class="mb-1"
            :color="gradeValueToColor(item.grade)"
          >
            {{ mdiCircle }}
          </v-icon>
          <span v-html="gradeValueToText(item.grade)" />
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
import { mdiCircle } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import { GradeMixin } from '~/mixins/GradeMixin'

export default {
  name: 'GymRoutesByGrade',
  components: { GymRouteListItem },
  mixins: [DateHelpers, GradeMixin],
  props: {
    grades: {
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
      mdiCircle
    }
  }
}
</script>
