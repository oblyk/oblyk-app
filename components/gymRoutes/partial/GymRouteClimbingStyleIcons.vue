<template>
  <div class="d-inline-bloc">
    <template v-for="section in gymRoute.sections">
      <v-icon
        v-for="(style, styleIndex) in section.styles"
        :key="`style-${styleIndex}`"
        class="mr-1"
        :color="styleColor(style)"
      >
        {{ climbingDataByStyles[style].icon }}
      </v-icon>
    </template>
  </div>
</template>

<script>
import { ClimbingStylesHelpers } from '~/mixins/ClimbingStylesHelpers'

export default {
  name: 'GymRouteClimbingStyleIcons',
  mixins: [ClimbingStylesHelpers],
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    showPitchNumber: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      iconColors: this.gym.gym_climbing_styles.filter(climbingStyle => climbingStyle.climbing_type === this.gymRoute.climbing_type)
    }
  },

  methods: {
    styleColor (style) {
      return (this.iconColors.find(iconStyle => iconStyle.style === style) || {}).color
    }
  }
}
</script>
