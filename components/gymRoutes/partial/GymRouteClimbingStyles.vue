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
          {{ MC_ClimbingStylesByStyle[style].icon }}
        </v-icon>
        {{ MC_ClimbingStylesByStyle[style].text }}
      </v-chip>
    </span>
  </div>
</template>

<script>
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'

export default {
  name: 'GymRouteClimbingStyles',
  mixins: [ClimbingStylesMixin],
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
