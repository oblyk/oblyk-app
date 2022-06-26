<template>
  <v-card class="full-height">
    <v-card-title>
      <h2 class="h2-title-in-card-title">
        <v-icon left>
          {{ mdiChartBar }}
        </v-icon>
        {{ $t('components.crag.gradesAndLevels') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <div v-if="loadingFigures">
        <p class="text--disabled text-center mt-5 mb-5">
          {{ $t('common.loading') }}
        </p>
      </div>

      <v-row v-else>
        <v-col cols="12" md="8">
          <locality-grade-chart
            :data="figures"
            height-class="height-250"
          />
        </v-col>
        <v-col cols="12" md="4">
          <div
            v-for="(degree, degreeIndex) in degreeLevels"
            :key="`degree-${degreeIndex}`"
          >
            <p
              v-if="figures.degrees[degree] > 0"
              class="mb-1"
            >
              <v-chip
                small
                :color="degrees[degree].color.background"
                :text-color="degrees[degree].color.text"
              >
                <strong class="span-comma">
                  <span v-if="figures.levels[`${degree}a`] > 0">{{ `${degree}a` }}</span>
                  <span v-if="figures.levels[`${degree}b`] > 0">{{ `${degree}b` }}</span>
                  <span v-if="figures.levels[`${degree}c`] > 0">{{ `${degree}c` }}</span>
                </strong>
              </v-chip>
              <strong>: {{ $tc('common.linesCount', figures.degrees[degree], { count: figures.degrees[degree] }) }}</strong>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiChartBar } from '@mdi/js'
import CragApi from '~/services/oblyk-api/CragApi'
import LocalityGradeChart from '~/components/localities/charts/LocalityGradeChart'
import { GradeMixin } from '~/mixins/GradeMixin'

export default {
  name: 'CragFigures',
  components: { LocalityGradeChart },
  mixins: [GradeMixin],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingFigures: true,
      figures: {},

      mdiChartBar
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loadingFigures = true
      new CragApi(this.$axios, this.$auth)
        .routeFigures(this.crag.id)
        .then((resp) => {
          this.figures = resp.data
        })
        .then(() => {
          this.loadingFigures = false
        })
    }
  }
}
</script>
