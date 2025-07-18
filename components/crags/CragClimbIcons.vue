<template>
  <div class="d-inline-block" style="line-height: 1em">
    <v-icon
      v-if="crag.aid_climbing"
      small
    >
      {{ oblykClimbAid }}
    </v-icon>
    <v-icon
      v-if="crag.bouldering"
      small
    >
      {{ oblykClimbBoulder }}
    </v-icon>
    <v-icon
      v-if="crag.deep_water"
      small
    >
      {{ oblykClimbDeepWater }}
    </v-icon>
    <v-icon
      v-if="crag.multi_pitch"
      small
    >
      {{ oblykClimbMultiPitch }}
    </v-icon>
    <v-icon
      v-if="crag.sport_climbing"
      small
    >
      {{ oblykClimbSportClimbing }}
    </v-icon>
    <v-icon
      v-if="crag.trad_climbing"
      small
    >
      {{ oblykClimbTrad }}
    </v-icon>
    <v-icon
      v-if="crag.via_ferrata"
      small
    >
      {{ oblykClimbViaFerrata }}
    </v-icon>
  </div>
</template>

<script>
import {
  oblykClimbAid,
  oblykClimbBoulder,
  oblykClimbDeepWater,
  oblykClimbMultiPitch,
  oblykClimbSportClimbing,
  oblykClimbTrad,
  oblykClimbViaFerrata
} from '~/assets/oblyk-icons'

export default {
  name: 'CragClimbIcons',
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      oblykClimbAid,
      oblykClimbBoulder,
      oblykClimbDeepWater,
      oblykClimbMultiPitch,
      oblykClimbSportClimbing,
      oblykClimbTrad,
      oblykClimbViaFerrata
    }
  }
}
</script>
