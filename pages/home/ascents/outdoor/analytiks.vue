<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
            <log-book-climbing-type-chart
              v-if="!loadingClimbingTypeChart"
              :data="climbingTypeData"
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
            <spinner v-if="loadingGradeChart" :full-height="false" />
            <log-book-grade-chart
              v-if="!loadingGradeChart"
              :data="gradeData"
              height-class="height-250"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-text>
            <spinner v-if="loadingEvolutionChart" :full-height="false" />
            <log-book-evolution-chart
              v-if="!loadingEvolutionChart"
              :data="evolutionData"
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

export default {
  name: 'CurrentUserAnalytiksView',
  components: {
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
      onlyLeadClimbs: false,

      loadingClimbingTypeChart: true,
      climbingTypeData: [],

      loadingGradeChart: true,
      gradeData: [],

      loadingYearChart: true,
      yearData: [],

      loadingMonthChart: true,
      monthData: [],

      loadingEvolutionChart: true,
      evolutionData: []
    }
  },

  head () {
    return {
      title: 'Analytiks'
    }
  },

  watch: {
    onlyLeadClimbs () {
      localStorage.setItem('onlyLeadClimbs', JSON.stringify(this.onlyLeadClimbs))
      this.getClimbingTypeChart()
      this.getGradeChart()
      this.getYearChart()
      this.getMonthChart()
      this.getEvolutionChart()
    }
  },

  mounted () {
    this.onlyLeadClimbs = JSON.parse(localStorage.getItem('onlyLeadClimbs')) || false
    this.getClimbingTypeChart()
    this.getGradeChart()
    this.getYearChart()
    this.getMonthChart()
    this.getEvolutionChart()
  },

  methods: {
    getClimbingTypeChart () {
      this.loadingClimbingTypeChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .climbingTypeChart(this.onlyLeadClimbs)
        .then((resp) => {
          this.climbingTypeData = resp.data
        })
        .finally(() => {
          this.loadingClimbingTypeChart = false
        })
    },

    getGradeChart () {
      this.loadingGradeChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .gradeChart(this.onlyLeadClimbs)
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    },

    getYearChart () {
      this.loadingYearChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .yearChart(this.onlyLeadClimbs)
        .then((resp) => {
          this.yearData = resp.data
        })
        .finally(() => {
          this.loadingYearChart = false
        })
    },

    getMonthChart () {
      this.loadingMonthChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .monthChart(this.onlyLeadClimbs)
        .then((resp) => {
          this.monthData = resp.data
        })
        .finally(() => {
          this.loadingMonthChart = false
        })
    },

    getEvolutionChart () {
      this.loadingEvolutionChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .evolutionChart(this.onlyLeadClimbs)
        .then((resp) => {
          this.evolutionData = resp.data
        })
        .finally(() => {
          this.loadingEvolutionChart = false
        })
    }
  }
}
</script>
