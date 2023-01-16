<template>
  <v-container fluid>
    <!-- Figures -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ $t('components.logBook.myIndoorLogBook') }}
          </v-card-title>
          <v-card-text>
            <spinner v-if="loadingFigures" :full-height="false" />
            <log-book-indoor-figures
              v-if="!loadingFigures && figures.ascents > 0"
              :figures="figures"
              :user="$auth.user"
            />

            <div
              v-else
              class="text-center mb-5"
            >
              <p class="mb-2">
                {{ $t('components.logBook.IHaveNoAscents') }}
              </p>
              <div>
                <v-btn
                  text
                  outlined
                  to="/ascents/indoor/new"
                >
                  <v-icon
                    left
                    color="primary"
                  >
                    {{ mdiPlusBoxOutline }}
                  </v-icon>
                  {{ $t('actions.addMyAscents') }}
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts -->
    <div
      v-if="chartsPart"
      class="mt-2"
    >
      <!-- Climbing type & grade chart-->
      <v-row>
        <v-col cols="12" lg="3">
          <v-card class="pa-4">
            <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
            <log-book-climbing-type-chart
              v-if="!loadingClimbingTypeChart"
              :data="climbingTypeData"
              legend-position="right"
              height-class="height-250"
              legend
            />
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-4">
            <spinner v-if="loadingGradeChart" :full-height="false" />
            <log-book-grade-chart
              v-if="!loadingGradeChart"
              :data="gradeData"
              height-class="height-250"
            />
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-4">
            <spinner v-if="loadingLevelChart" :full-height="false" />
            <div v-if="!loadingLevelChart">
              <div
                v-for="(chartFor, chartForIndex) in levelData"
                :key="`chartFor-index-${chartForIndex}`"
              >
                <indoor-level-chart
                  v-if="chartFor.type === 'level_chart' && showLevelChartIndex === chartForIndex"
                  :data="chartFor.chart"
                  :show-title="true"
                  height-class="height-215"
                />
              </div>
              <p
                v-if="levelData.length > 1"
                class="mb-0 mt-2 text-center"
              >
                <v-btn
                  v-for="(chartFor, chartForIndex) in levelData"
                  :key="`chartFor-index-${chartForIndex}`"
                  small
                  text
                  outlined
                  class="mx-1"
                  @click="showLevelChartIndex = chartForIndex"
                >
                  <span v-if="chartFor.type === 'level_chart'">
                    <v-icon
                      v-for="(colorSystemLine, colorSystemIndex) in chartFor.color_system.color_system_lines"
                      :key="`color-system-index-${colorSystemIndex}`"
                      :color="colorSystemLine.hex_color"
                      small
                    >
                      {{ mdiCircle }}
                    </v-icon>
                  </span>
                </v-btn>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Time graph (month & year) -->
      <v-row>
        <v-col cols="12" md="6" lg="8">
          <v-card>
            <v-card-text>
              <spinner v-if="loadingMonthChart" :full-height="false" />
              <log-book-month-chart
                v-if="!loadingMonthChart"
                :data="monthData"
                height-class="height-250"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-card>
            <v-card-text>
              <spinner v-if="loadingYearChart" :full-height="false" />
              <log-book-year-chart
                v-if="!loadingYearChart"
                :data="yearData"
                height-class="height-250"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mdiCircle, mdiPlusBoxOutline } from '@mdi/js'
import LogBookIndoorFigures from '~/components/logBooks/indoors/LogBookIndoorFigures.vue'
import LogBookIndoorApi from '~/services/oblyk-api/LogBookIndoorApi'
import Spinner from '~/components/layouts/Spiner.vue'
import LogBookClimbingTypeChart from '~/components/logBooks/outdoors/LogBookClimbingTypeChart.vue'
import LogBookMonthChart from '~/components/logBooks/outdoors/LogBookMonthChart.vue'
import LogBookYearChart from '~/components/logBooks/outdoors/LogBookYearChart.vue'
import LogBookGradeChart from '~/components/logBooks/outdoors/LogBookGradeChart.vue'
import IndoorLevelChart from '~/components/logBooks/indoors/IndoorLevelChart.vue'

export default {
  components: {
    IndoorLevelChart,
    LogBookGradeChart,
    LogBookYearChart,
    LogBookMonthChart,
    LogBookClimbingTypeChart,
    Spinner,
    LogBookIndoorFigures
  },

  data () {
    return {
      chartsPart: false,

      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {},

      loadingMonthChart: true,
      monthData: {},

      loadingYearChart: true,
      yearData: {},

      loadingLevelChart: true,
      showLevelChartIndex: 0,
      levelData: [],

      mdiCircle,
      mdiPlusBoxOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes croix indoor'
      },
      en: {
        metaTitle: 'My indoor ascents'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loadingFigures = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
          if (this.figures.ascents > 0) {
            this.chartsPart = true
            this.loadCharts()
          }
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    loadCharts () {
      this.getClimbingTypeChart()
      this.getYearChart()
      this.getMonthChart()
      this.getGradeChart()
      this.getLevelChart()
    },

    getClimbingTypeChart () {
      this.loadingFigures = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .climbingTypeChart()
        .then((resp) => {
          this.climbingTypeData = resp.data
        })
        .finally(() => {
          this.loadingClimbingTypeChart = false
        })
    },

    getGradeChart () {
      this.loadingGradeChart = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .gradeChart()
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    },

    getLevelChart () {
      this.loadingLevelChart = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .byLevelsChart()
        .then((resp) => {
          this.levelData = resp.data
        })
        .finally(() => {
          this.loadingLevelChart = false
        })
    },

    getYearChart () {
      this.loadingYearChart = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .yearChart()
        .then((resp) => {
          this.yearData = resp.data
        })
        .finally(() => {
          this.loadingYearChart = false
        })
    },

    getMonthChart () {
      this.loadingMonthChart = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .monthChart()
        .then((resp) => {
          this.monthData = resp.data
        })
        .finally(() => {
          this.loadingMonthChart = false
        })
    }
  }
}
</script>
