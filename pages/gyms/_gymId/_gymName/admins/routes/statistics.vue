<template>
  <v-container fluid>
    <div v-if="gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-admin-routes-tabs :gym="gym" />
      <div>
        <!-- Filters -->
        <gym-statistic-filters
          :emit-filters="emitFilters"
          :gym="gym"
          class="mt-4"
        />

        <!-- Statistic -->
        <v-row class="mt-2">
          <!-- Figures -->
          <v-col
            cols="12"
            md="4"
            class="align-stretch"
          >
            <gym-statistic-figures
              :filters="filters"
              :gym="gym"
            />
          </v-col>

          <!-- Route by grades -->
          <v-col
            cols="12"
            md="4"
            class="align-stretch"
          >
            <gym-statistic-grades-chart
              :filters="filters"
              :gym="gym"
            />
          </v-col>

          <!-- Routes by level -->
          <v-col
            cols="12"
            md="4"
            class="align-stretch"
          >
            <gym-statistic-levels-chart
              :filters="filters"
              :gym="gym"
            />
          </v-col>

          <!-- Notes -->
          <v-col
            cols="12"
            md="3"
            class="align-stretch"
          >
            <gym-statistic-like-figures
              :filters="filters"
              :gym="gym"
            />
          </v-col>

          <!-- Opening frequencies -->
          <v-col
            cols="12"
            md="9"
            class="align-stretch"
          >
            <gym-statistic-opening-frequencies-chart
              :filters="filters"
              :gym="gym"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymAdminRoutesTabs from '~/components/gyms/layouts/GymAdminRoutesTabs.vue'
import GymStatisticFilters from '~/components/gymStatistics/GymStatisticFilters.vue'
import GymStatisticFigures from '~/components/gymStatistics/GymStatisticFigures.vue'
import GymStatisticGradesChart from '~/components/gymStatistics/GymStatisticGradesChart.vue'
import GymStatisticLevelsChart from '~/components/gymStatistics/GymStatisticLevelsChart.vue'
import GymStatisticOpeningFrequenciesChart from '~/components/gymStatistics/GymStatisticOpeningFrequenciesChart.vue'
import GymStatisticLikeFigures from '~/components/gymStatistics/GymStatisticLikeFigures.vue'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  components: {
    GymStatisticLikeFigures,
    GymStatisticOpeningFrequenciesChart,
    GymStatisticLevelsChart,
    GymStatisticGradesChart,
    GymStatisticFigures,
    GymStatisticFilters,
    GymAdminRoutesTabs
  },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, DateHelpers],

  data () {
    return {
      filters: {
        date: this.ISODateToday(),
        spaceIds: [],
        openerIds: []
      }
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} - Statistique'
      },
      en: {
        metaTitle: '%{name} - Statistic'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name })
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.routes'),
          disabled: true
        },
        {
          text: this.$t('components.gym.tabs.statistics'),
          to: `${this.gym?.adminPath}/routes/statistics`,
          exact: true
        }
      ]
    }
  },

  methods: {
    emitFilters (filters) {
      this.filters = {
        date: filters.date,
        space_ids: filters.spaceIds,
        opener_ids: filters.openerIds
      }
    }
  }
}
</script>
