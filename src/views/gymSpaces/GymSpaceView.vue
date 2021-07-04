<template>
  <div class="gym-spaces-routes-and-plan" v-if="gymSpace">

    <v-row class="gym-spaces-routes-and-plan-row">
      <v-col
        class="gym-space-routes-col"
        v-show="!mobilInterface || linePanel"
        v-bind:class="mobilInterface ? 'mobil-interface' : 'desktop-interface'"
      >
        <gym-space-route :gym-space="gymSpace" />
      </v-col>

      <v-col
        ref="gym-space-ma-area"
        v-if="!mobilInterface || planPanel"
        class="col gym-space-plan-col pt-0 pb-0 pl-0 pr-0"
        v-bind:class="mobilInterface ? 'mobil-interface' : 'desktop-interface'"
      >
        <gym-space-plan :gym-space="gymSpace" v-if="gymSpace.plan" />
        <gym-space-plan-missing :gym-space="gymSpace" v-if="!gymSpace.plan" />
      </v-col>
    </v-row>

    <v-bottom-navigation
      app
      v-if="mobilInterface"
      height="40"
      horizontal
      grow
    >
      <v-btn
        @click="showLine()"
      >
        <span>Ouvertures</span>
        <v-icon>mdi-arrow-decision</v-icon>
      </v-btn>
      <v-btn
        @click="showPlan()"
      >
        <span>Plan</span>
        <v-icon>mdi-map-legend</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceRoute from '@/components/gymSpaces/GymSpaceRoute'
import GymSpacePlan from '@/components/gymSpaces/GymSpacePlan'
import GymSpacePlanMissing from '@/components/gymSpaces/GymSpacePlanMissing'

export default {
  name: 'GymSpaceView',
  components: { GymSpacePlanMissing, GymSpacePlan, GymSpaceRoute },
  mixins: [GymSpaceConcern],

  data () {
    return {
      mobilInterface: true,
      linePanel: true,
      planPanel: false
    }
  },

  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
      this.mobilInterface = window.innerWidth < 700
    },

    showPlan: function () {
      this.linePanel = false
      this.planPanel = true
    },

    showLine: function () {
      this.linePanel = true
      this.planPanel = false
    }
  }
}
</script>

<style lang="scss">
.gym-spaces-routes-and-plan {
  .gym-spaces-routes-and-plan-row {
    max-width: 100vw;
    margin-left: 0;
    .gym-space-routes-col {
      &.desktop-interface {
        max-width: 450px;
      }
    }
    .gym-space-plan-col {

    }
  }
}
</style>
