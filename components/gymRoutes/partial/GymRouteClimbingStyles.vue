<template>
  <div>
    <span
      v-for="(section, sectionIndex) in gymRoute.sections"
      :key="`section-${sectionIndex}`"
    >
      <span v-if="showPitchNumber && gymRoute.sections.length > 1">
        L.{{ sectionIndex + 1 }} :
      </span>
      <v-chip
        v-for="(style, styleIndex) in section.styles"
        :key="`style-${styleIndex}`"
        small
        class="mr-2"
      >
        <v-icon
          class="mr-1"
          small
          :color="styleColor(style)"
        >
          {{ climbingDataByStyles[style].icon }}
        </v-icon>
        {{ climbingDataByStyles[style].text }}
      </v-chip>
    </span>
  </div>
</template>

<script>
import { ClimbingStylesHelpers } from '~/mixins/ClimbingStylesHelpers'

export default {
  name: 'GymRouteClimbingStyles',
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
