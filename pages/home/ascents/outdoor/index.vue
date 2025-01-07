<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <ascent-filters-form v-model="filters" />
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-card-text>
        <v-row>
          <!-- Climbing type chart -->
          <v-col class="col-12 col-md-6 col-lg-3">
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-climbing-type-chart
              v-if="!loadingStats"
              :data="stats.climb_types_chart"
              :legend="false"
            />
            <!-- Climbing type legend -->
            <climbing-type-legend class="mt-3" />
          </v-col>

          <!-- Climbing grade chart -->
          <v-col class="col-12 col-md-6 col-lg-4">
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-grade-chart
              v-if="!loadingStats"
              :data="stats.grades_chart"
            />
          </v-col>

          <!-- Global figures -->
          <v-col class="col-12 col-md-12 col-lg-5">
            <spinner v-if="loadingStats" :full-height="false" />
            <log-book-figures
              v-if="!loadingStats"
              :figures="stats.figures"
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
        <log-book-list :filters="filters" />
      </v-card-text>
    </v-card>
    <client-only>
      <crag-route-drawer />
    </client-only>
  </v-container>
</template>

<script>
import AscentFiltersForm from '~/components/logBooks/outdoors/AscentFiltersForm'
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
    AscentFiltersForm,
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
      loadingStats: true,

      filters: {},
      stats: {
        figures: {},
        climb_types_chart: {},
        grades_chart: {}
      },
      stats_list: {
        figures: true,
        climb_types_chart: true,
        grades_chart: true
      }
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

  watch: {
    filters () {
      this.getStats()
    },
    deep: true,
    immediate: true
  },

  mounted () {
    this.getStats()
  },

  methods: {
    getStats () {
      this.loadingStats = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .stats(this.stats_list, this.filters)
        .then((resp) => {
          this.stats = resp.data
          if (this.stats.figures.ascents > 0) {
            this.loadTheRest = true
          }
        })
        .finally(() => {
          this.loadingStats = false
        })
    }
  }
}
</script>
