<template>
  <v-icon
    :color="colors[climbingStyle]"
    :small="small"
    :left="left"
    :right="right"
  >
    {{ icons[climbingStyle] }}
  </v-icon>
</template>

<script>
import {
  oblykClimbSportClimbing,
  oblykClimbBoulder,
  oblykClimbMultiPitch,
  oblykClimbTrad,
  oblykClimbAid,
  oblykClimbDeepWater,
  oblykClimbViaFerrata
} from '~/assets/oblyk-icons'

export default {
  name: 'ClimbingStyleIcon',
  props: {
    climbingStyle: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      icons: {
        sport_climbing: oblykClimbSportClimbing,
        bouldering: oblykClimbBoulder,
        multi_pitch: oblykClimbMultiPitch,
        trad_climbing: oblykClimbTrad,
        aid_climbing: oblykClimbAid,
        deep_water: oblykClimbDeepWater,
        via_ferrata: oblykClimbViaFerrata
      },
      colors: {
        sport_climbing: '#3a71c7',
        bouldering: '#ffcb00',
        multi_pitch: '#ff5656',
        trad_climbing: '#e92b2b',
        aid_climbing: '#d40000',
        deep_water: '#86ccdd',
        via_ferrata: '#3cc770'
      }
    }
  }
}
</script>
