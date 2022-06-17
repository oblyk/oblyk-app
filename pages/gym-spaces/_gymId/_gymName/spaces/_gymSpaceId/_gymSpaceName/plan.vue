<template>
  <div v-if="gymSpace" class="gym-spaces-routes-and-plan">
    <v-row class="gym-spaces-routes-and-plan-row">
      <v-col
        v-show="!mobilInterface || linePanel"
        class="gym-space-routes-col"
        :class="mobilInterface ? 'mobil-interface' : 'desktop-interface'"
      >
        <gym-space-route :gym-space="gymSpace" />
      </v-col>

      <v-col
        v-if="!mobilInterface || planPanel"
        ref="gym-space-ma-area"
        class="col gym-space-plan-col pt-0 pb-0 pl-0 pr-0"
        :class="mobilInterface ? 'mobil-interface' : 'desktop-interface'"
      >
        <client-only>
          <gym-space-plan v-if="gymSpace.plan" :gym-space="gymSpace" />
          <gym-space-plan-missing v-if="!gymSpace.plan" :gym-space="gymSpace" />
        </client-only>
      </v-col>
    </v-row>

    <v-bottom-navigation
      v-if="mobilInterface"
      app
      height="40"
      horizontal
      grow
    >
      <v-btn
        @click="showLine()"
      >
        <span>{{ $t('components.gymSpace.routes') }}</span>
        <v-icon>{{ mdiArrowDecision }}</v-icon>
      </v-btn>
      <v-btn
        @click="showPlan()"
      >
        <span>{{ $t('components.gymSpace.plan') }}</span>
        <v-icon>{{ mdiMapLegend }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mdiArrowDecision, mdiMapLegend } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceRoute from '@/components/gymSpaces/GymSpaceRoute'
import GymSpacePlanMissing from '@/components/gymSpaces/GymSpacePlanMissing'
const GymSpacePlan = () => import('@/components/gymSpaces/GymSpacePlan')

export default {
  components: {
    GymSpacePlanMissing,
    GymSpacePlan,
    GymSpaceRoute
  },
  mixins: [GymSpaceConcern],

  data () {
    return {
      mdiArrowDecision,
      mdiMapLegend,
      mobilInterface: true,
      linePanel: true,
      planPanel: false
    }
  },

  mounted () {
    this.$root.$on('showGymSpaceLine', () => {
      this.showLine()
    })

    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    this.$root.$off('showGymSpaceLine')
  },

  methods: {
    onResize () {
      this.mobilInterface = window.innerWidth < 700
    },

    showPlan () {
      this.linePanel = false
      this.planPanel = true
    },

    showLine () {
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
