<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <!-- Climbing type chart -->
          <v-col class="col-12 col-md-6 col-lg-3">
            <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
            <log-book-climbing-type-chart
              v-if="!loadingClimbingTypeChart"
              :data="climbingTypeData"
              :legend="false"
            />
            <!-- Climbing type legend -->
            <climbing-type-legend class="mt-3" />
          </v-col>

          <!-- Climbing grade chart -->
          <v-col class="col-12 col-md-6 col-lg-4">
            <spinner v-if="loadingGradeChart" :full-height="false" />
            <log-book-grade-chart
              v-if="!loadingGradeChart"
              :data="gradeData"
            />
          </v-col>

          <!-- Global figures -->
          <v-col class="col-12 col-md-12 col-lg-5">
            <spinner v-if="loadingFigures" :full-height="false" />
            <log-book-figures
              v-if="!loadingFigures"
              :figures="figures"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      class="mt-3"
    >
      <v-card-text>
        <!-- Send list -->
        <log-book-list />
      </v-card-text>
    </v-card>
    <client-only>
      <crag-route-drawer />
    </client-only>
  </v-container>
</template>

<script>
import LogBookFigures from '@/components/logBooks/outdoors/LogBookFigures'
import LogBookOutdoorApi from '@/services/oblyk-api/LogBookOutdoorApi'
import Spinner from '@/components/layouts/Spiner'
import LogBookClimbingTypeChart from '@/components/logBooks/outdoors/LogBookClimbingTypeChart'
import LogBookGradeChart from '@/components/logBooks/outdoors/LogBookGradeChart'
import LogBookList from '@/components/logBooks/outdoors/LogBookList'
import ClimbingTypeLegend from '@/components/ui/ClimbingTypeLegend'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  name: 'CurrentUserSendListView',
  components: {
    ClimbingTypeLegend,
    CragRouteDrawer,
    LogBookList,
    LogBookGradeChart,
    LogBookClimbingTypeChart,
    Spinner,
    LogBookFigures
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {}
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.sendList')
    }
  },

  mounted () {
    this.getFigures()
    this.getClimbingTypeChart()
    this.getGradeChart()
  },

  methods: {
    getFigures () {
      this.loadingFigures = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    getClimbingTypeChart () {
      this.loadingClimbingTypeChart = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
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
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .gradeChart()
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    }
  }
}
</script>
