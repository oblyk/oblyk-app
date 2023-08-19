<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiCounter }}
      </v-icon>
      {{ $t('components.gymStatistic.figuresTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <v-row v-else>
      <v-col cols="6">
        <description-line
          :item-title="$t('components.gymStatistic.mountedRoutes')"
          :item-value="figures.route_count"
          :icon="mdiSourceBranch"
        />
      </v-col>
      <v-col cols="6">
        <description-line
          :item-title="$t('components.gymStatistic.ascentsCount')"
          :item-value="figures.ascent_count"
          :icon="mdiCheckAll"
        />
      </v-col>
      <v-col cols="12">
        <description-line
          :item-title="$t('components.gymStatistic.averageOpeningDayTitle')"
          :item-value="figures.opening.average_route_age ? $t('components.gymStatistic.averageOpeningDay', { age: figures.opening.average_route_age }) : null"
          :icon="mdiCalendarCollapseHorizontal"
        />
      </v-col>
      <v-col cols="6">
        <description-line
          :item-title="$t('components.gymStatistic.oldestOpeningDate')"
          :icon="mdiCalendarArrowLeft"
          :title="humanizeDate(figures.opening.oldest_opening_date, 'DATE_SHORT')"
        >
          <template #content>
            <span v-if="figures.opening.oldest_route_age">
              {{ $t('components.gymStatistic.dayAgo', { day: figures.opening.oldest_route_age }) }}
            </span>
            <span v-else class="text--disabled">
              {{ $t('common.noInformation') }}
            </span>
          </template>
        </description-line>
      </v-col>
      <v-col cols="6">
        <description-line
          :item-title="$t('components.gymStatistic.youngestOpeningDate')"
          :icon="mdiCalendarArrowRight"
          :title="humanizeDate(figures.opening.youngest_opening_date, 'DATE_SHORT')"
        >
          <template #content>
            <span v-if="figures.opening.youngest_route_age">
              {{ $t('components.gymStatistic.dayAgo', { day: figures.opening.youngest_route_age }) }}
            </span>
            <span v-else class="text--disabled">
              {{ $t('common.noInformation') }}
            </span>
          </template>
        </description-line>
      </v-col>
      <v-col>
        <description-line
          :item-title="$t('components.gymStatistic.levelTitle')"
          :item-value="figures.grade.min_value ? $t('components.gymStatistic.levelFormToAvg', { min: gradeValueToText(figures.grade.min_value), max: gradeValueToText(figures.grade.max_value), avg: gradeValueToText(figures.grade.average_value) }) : null"
          :icon="mdiTune"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import {
  mdiCounter,
  mdiSourceBranch,
  mdiCheckAll,
  mdiCalendarArrowLeft,
  mdiCalendarArrowRight,
  mdiTune,
  mdiCalendarCollapseHorizontal
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'

export default {
  name: 'GymStatisticFigures',
  components: { DescriptionLine },
  mixins: [DateHelpers, GradeMixin],
  props: {
    gym: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      figures: {},

      mdiCounter,
      mdiSourceBranch,
      mdiCheckAll,
      mdiCalendarArrowLeft,
      mdiCalendarArrowRight,
      mdiTune,
      mdiCalendarCollapseHorizontal
    }
  },

  watch: {
    filters: {
      handler () {
        this.getFigures()
      },
      deep: true
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loading = true
      new GymRouteStatisticApi(this.$axios, this.$auth)
        .figures(this.gym.id, this.filters)
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
