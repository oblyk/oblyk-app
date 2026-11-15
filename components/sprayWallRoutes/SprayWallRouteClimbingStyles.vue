<template>
  <div>
    <v-chip
      v-for="(style, styleIndex) in sprayWallRoute.styles ?? []"
      :key="`style-${styleIndex}`"
      small
      class="mr-2"
      @click="pushStyleFilter(style)"
    >
      <v-icon
        small
        left
        :color="styleColor(style)"
      >
        {{ MC_ClimbingStylesByStyle[style].icon }}
      </v-icon>
      {{ MC_ClimbingStylesByStyle[style].text }}
    </v-chip>
  </div>
</template>

<script>
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'

export default {
  name: 'SprayWallRouteClimbingStyles',
  mixins: [ClimbingStylesMixin],
  props: {
    sprayWallRoute: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    pushStyleFilterCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      iconColors: this.gym.gym_climbing_styles.filter(climbingStyle => climbingStyle.climbing_type === 'spray_wall')
    }
  },

  methods: {
    styleColor (style) {
      return (this.iconColors.find(iconStyle => iconStyle.style === style) || {}).color
    },

    pushStyleFilter (style) {
      this.pushStyleFilterCallback(
        {
          type: 'style',
          value: style,
          text: this.MC_ClimbingStylesByStyle[style].text,
          icon: this.MC_ClimbingStylesByStyle[style].icon
        }
      )
    }
  }
}
</script>
