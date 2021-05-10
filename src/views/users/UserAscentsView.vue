<template>
  <v-container>
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
        <v-select
          :items="sortItems"
          item-text="text"
          item-value="value"
          v-model="order"
          :label="$t('components.logBook.sortByLabel')"
          outlined
        />

        <spinner v-if="loadingAscendedCragRoutes" :full-height="false" />
        <log-book-list
          :break="order"
          v-if="!loadingAscendedCragRoutes"
          :crag-routes="cragRoutes"
        />
      </v-card-text>
    </v-card>
    <crag-route-drawer />
  </v-container>
</template>

<script>
import LogBookFigures from '@/components/logBooks/outdoors/LogBookFigures'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import LogBookClimbingTypeChart from '@/components/logBooks/outdoors/LogBookClimbingTypeChart'
import LogBookGradeChart from '@/components/logBooks/outdoors/LogBookGradeChart'
import CragRoute from '@/models/CragRoute'
import LogBookList from '@/components/logBooks/outdoors/LogBookList'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'
import ClimbingTypeLegend from '@/components/ui/ClimbingTypeLegend'

export default {
  name: 'UserAscentView',
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
    user: Object
  },

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.ascent.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.ascent.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path('ascents')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.userMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.userMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.userMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.userMetaDescription },
        { vmid: 'og-url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  data () {
    return {
      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {},

      loadingAscendedCragRoutes: true,
      cragRoutes: [],

      order: 'difficulty',

      sortItems: [
        { text: this.$t('components.logBook.sortItem.difficulty'), value: 'difficulty' },
        { text: this.$t('components.logBook.sortItem.crags'), value: 'crags' },
        { text: this.$t('components.logBook.sortItem.released_at'), value: 'released_at' }
      ]
    }
  },

  watch: {
    order: function () {
      this.ascendedCragRoutes()
    }
  },

  mounted () {
    this.getFigures()
    this.getClimbingTypeChart()
    this.getGradeChart()
    this.ascendedCragRoutes()
  },

  methods: {
    getFigures: function () {
      this.loadingFigures = true
      UserApi
        .outdoorFigures(this.user.uuid)
        .then(resp => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    getClimbingTypeChart: function () {
      this.loadingClimbingTypeChart = true
      UserApi
        .outdoorClimbTypesChart(this.user.uuid)
        .then(resp => {
          this.climbingTypeData = resp.data
        })
        .finally(() => {
          this.loadingClimbingTypeChart = false
        })
    },

    getGradeChart: function () {
      this.loadingGradeChart = true
      UserApi
        .outdoorGradesChart(this.user.uuid)
        .then(resp => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    },

    ascendedCragRoutes: function () {
      this.loadingAscendedCragRoutes = true
      UserApi
        .ascendedCragRoutes(this.user.uuid, this.order)
        .then(resp => {
          this.cragRoutes = []
          for (const route of resp.data) {
            this.cragRoutes.push(new CragRoute(route))
          }
        })
        .finally(() => {
          this.loadingAscendedCragRoutes = false
        })
    }
  }
}
</script>
