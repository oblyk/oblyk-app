<template>
  <div class="d-inline">
    <!-- Sport climbing -->
    <v-chip
      v-if="crag.sport_climbing"
      outlined
    >
      <v-icon color="#3a71c7" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.sport_climbing') }}
    </v-chip>

    <!-- Bouldering -->
    <v-chip
      v-if="crag.bouldering"
      outlined
    >
      <v-icon color="#ffcb00" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.bouldering') }}
    </v-chip>

    <!-- Multi pitch -->
    <v-chip
      v-if="crag.multi_pitch"
      outlined
    >
      <v-icon color="#ff5656" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.multi_pitch') }}
    </v-chip>

    <!-- Trad Climbing -->
    <v-chip
      v-if="crag.trad_climbing"
      outlined
    >
      <v-icon color="#e92b2b" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.trad_climbing') }}
    </v-chip>

    <!-- Aid Climbing -->
    <v-chip
      v-if="crag.aid_climbing"
      outlined
    >
      <v-icon color="#d40000" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.aid_climbing') }}
    </v-chip>

    <!-- Deep Water -->
    <v-chip
      v-if="crag.deep_water"
      outlined
    >
      <v-icon color="#86ccdd" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.deep_water') }}
    </v-chip>

    <!-- Via Ferrata -->
    <v-chip
      v-if="crag.via_ferrata"
      outlined
    >
      <v-icon color="#3cc770" small left>
        {{ mdiCircle }}
      </v-icon>
      {{ $t('models.crag.via_ferrata') }}
    </v-chip>
  </div>
</template>

<script>
import { mdiCircle } from '@mdi/js'

export default {
  name: 'ClimbingStyleCragChips',
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCircle
    }
  }
}
</script>
