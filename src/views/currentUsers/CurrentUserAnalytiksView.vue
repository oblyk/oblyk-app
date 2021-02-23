<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-md-6 col-lg-4">
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
      <v-col class="col-12 col-md-6 col-lg-4">
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
      <v-col class="col-12 col-md-6 col-lg-4">
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
      <v-col class="col-12 col-md-6 col-lg-8">
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
      <v-col class="col-12 col-md-6 col-lg-4">
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
import Spinner from '@/components/layouts/Spiner'
import LogBookClimbingTypeChart from '@/components/logBooks/outdoors/LogBookClimbingTypeChart'
import LogBookOutdoorApi from '@/services/oblyk-api/LogBookOutdoorApi'
import LogBookGradeChart from '@/components/logBooks/outdoors/LogBookGradeChart'
import LogBookYearChart from '@/components/logBooks/outdoors/LogBookYearChart'
import LogBookMonthChart from '@/components/logBooks/outdoors/LogBookMonthChart'
import LogBookEvolutionChart from '@/components/logBooks/outdoors/LogBookEvolutionChart'

export default {
  name: 'CurrentUserAnalytiksView',
  components: { LogBookEvolutionChart, LogBookMonthChart, LogBookYearChart, LogBookGradeChart, LogBookClimbingTypeChart, Spinner },
  props: {
    user: Object
  },

  data () {
    return {
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

  mounted () {
    this.getClimbingTypeChart()
    this.getGradeChart()
    this.getYearChart()
    this.getMonthChart()
    this.getEvolutionChart()
  },

  methods: {
    getClimbingTypeChart: function () {
      this.loadingClimbingTypeChart = true
      LogBookOutdoorApi
        .climbingTypeChart()
        .then(resp => {
          this.climbingTypeData = resp.data
        })
        .finally(() => {
          this.loadingClimbingTypeChart = false
        })
    },

    getGradeChart: function () {
      this.loadingGradeChart = true
      LogBookOutdoorApi
        .gradeChart()
        .then(resp => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    },

    getYearChart: function () {
      this.loadingYearChart = true
      LogBookOutdoorApi
        .yearChart()
        .then(resp => {
          this.yearData = resp.data
        })
        .finally(() => {
          this.loadingYearChart = false
        })
    },

    getMonthChart: function () {
      this.loadingMonthChart = true
      LogBookOutdoorApi
        .monthChart()
        .then(resp => {
          this.monthData = resp.data
        })
        .finally(() => {
          this.loadingMonthChart = false
        })
    },

    getEvolutionChart: function () {
      this.loadingEvolutionChart = true
      LogBookOutdoorApi
        .evolutionChart()
        .then(resp => {
          this.evolutionData = resp.data
        })
        .finally(() => {
          this.loadingEvolutionChart = false
        })
    }
  }
}
</script>
