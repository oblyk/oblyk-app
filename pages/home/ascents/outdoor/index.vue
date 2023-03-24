<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <!-- Climbing type chart -->
          <v-col class="col-12 col-md-6 col-lg-3">
            <div v-if="loadTheRest">
              <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
              <log-book-climbing-type-chart
                v-if="!loadingClimbingTypeChart"
                :data="climbingTypeData"
                :legend="false"
              />
              <!-- Climbing type legend -->
              <climbing-type-legend class="mt-3" />
            </div>
          </v-col>

          <!-- Climbing grade chart -->
          <v-col class="col-12 col-md-6 col-lg-4">
            <div v-if="loadTheRest">
              <spinner v-if="loadingGradeChart" :full-height="false" />
              <log-book-grade-chart
                v-if="!loadingGradeChart"
                :data="gradeData"
              />
            </div>
          </v-col>

          <!-- Global figures -->
          <v-col class="col-12 col-md-12 col-lg-5">
            <spinner v-if="loadingFigures" :full-height="false" />
            <log-book-figures
              v-if="!loadingFigures"
              :figures="figures"
              :user="user"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-if="loadTheRest"
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
import LogBookFigures from '~/components/logBooks/outdoors/LogBookFigures.vue'
import LogBookOutdoorApi from '~/services/oblyk-api/LogBookOutdoorApi'
import Spinner from '~/components/layouts/Spiner.vue'
import LogBookClimbingTypeChart from '~/components/logBooks/outdoors/LogBookClimbingTypeChart.vue'
import LogBookGradeChart from '~/components/logBooks/outdoors/LogBookGradeChart.vue'
import LogBookList from '~/components/logBooks/outdoors/LogBookList.vue'
import ClimbingTypeLegend from '~/components/ui/ClimbingTypeLegend.vue'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer.vue')

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
      loadTheRest: false,

      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {}
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes croix outdoor'
      },
      en: {
        metaTitle: 'My outdoor ascents'
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
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
          if (this.figures.ascents > 0) {
            this.loadTheRest = true
            this.getOtherChars()
          }
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    getOtherChars () {
      this.getClimbingTypeChart()
      this.getGradeChart()
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
