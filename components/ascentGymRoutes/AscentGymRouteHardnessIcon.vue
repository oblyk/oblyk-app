<template>
  <v-chip
    v-if="hardness()"
    small
    outlined
    class="pl-1 pr-2"
  >
    <strong
      class="pl-1"
    >
      {{ label() }}
    </strong>
  </v-chip>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentGymRoute from '~/models/AscentGymRoute'

export default {
  name: 'AscentGymRouteIcon',
  mixins: [DateHelpers],
  props: {
    ascent: {
      type: AscentGymRoute,
      default: null
    }
  },

  methods: {
    hardness () {
      return this.ascent?.hardness_status
    },

    statusIcon () {
      if (this.hardness() === 'easy_for_the_grade') {
        return '😎'
      } else if (this.hardness() === 'this_grade_is_accurate') {
        return '👌'
      } else if (this.hardness() === 'sandbagged') {
        return '🥵'
      }
    },

    label () {
      return this.$t(`models.hardnessStatus.${this.hardness()}`)
    }
  }
}
</script>
