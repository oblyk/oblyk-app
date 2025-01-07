<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <ascent-filters-form v-model="filters" />
      </v-card-text>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-climbing-type-chart
              v-if="!loadingStats"
              :data="stats.climbTypesChart"
              height-class="height-250"
              :legend="true"
              legend-position="right"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-grade-chart
              v-if="!loadingStats"
              :data="stats.gradesChart"
              height-class="height-250"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-evolution-chart
              v-if="!loadingStats"
              :data="stats.evolutionChart"
              height-class="height-250"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="8">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-month-chart
              v-if="!loadingStats"
              :data="stats.monthsChart"
              height-class="height-250"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-year-chart
              v-if="!loadingStats"
              :data="stats.yearsChart"
              height-class="height-250"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Spinner from '~/components/layouts/Spiner.vue'
import LogBookClimbingTypeChart from '~/components/logBooks/outdoors/LogBookClimbingTypeChart.vue'
import LogBookOutdoorApi from '~/services/oblyk-api/LogBookOutdoorApi'
import LogBookGradeChart from '~/components/logBooks/outdoors/LogBookGradeChart.vue'
import LogBookYearChart from '~/components/logBooks/outdoors/LogBookYearChart.vue'
import LogBookMonthChart from '~/components/logBooks/outdoors/LogBookMonthChart.vue'
import LogBookEvolutionChart from '~/components/logBooks/outdoors/LogBookEvolutionChart.vue'
import AscentFiltersForm from '~/components/logBooks/outdoors/AscentFiltersForm'

export default {
  name: 'CurrentUserAnalytiksView',
  components: {
    AscentFiltersForm,
    LogBookEvolutionChart,
    LogBookMonthChart,
    LogBookYearChart,
    LogBookGradeChart,
    LogBookClimbingTypeChart,
    Spinner
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      filters: [],

      loadingStats: true,
      stats: {
        climbTypesChart: {},
        gradesChart: {},
        yearsChart: {},
        monthsChart: {},
        evolutionChart: {}
      },
      stats_list: {
        climbTypesChart: true,
        gradesChart: true,
        yearsChart: true,
        monthsChart: true,
        evolutionChart: true
      }
    }
  },

  head () {
    return {
      title: 'Analytiks'
    }
  },

  watch: {
    filters () {
      this.getAllCharts()
    }
  },

  mounted () {
    this.getAllCharts()
  },

  methods: {
    getAllCharts () {
      this.loadingStats = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .stats(this.stats_list, this.filters)
        .then((resp) => {
          this.stats = resp.data
        })
        .finally(() => {
          this.loadingStats = false
        })
    }
  }
}
</script>
