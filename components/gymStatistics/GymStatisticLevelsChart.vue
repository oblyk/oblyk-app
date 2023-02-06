<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiTag }}
      </v-icon>
      {{ $t('components.gymStatistic.levelChartTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <div v-if="levels.length > 0">
        <indoor-level-chart
          :data="levels[chartIndex].chart"
          :height-class="levels.length > 1 ? 'height-220' : 'height-250'"
        />
        <div
          v-if="levels.length > 1"
          class="text-no-wrap overflow-x-auto mt-3"
        >
          <v-chip
            v-for="(level, levelIndex) in levels"
            :key="`level-index-${levelIndex}`"
            :color="levelIndex === chartIndex ? 'primary' : ''"
            outlined
            class="mr-1"
            @click="chartIndex = levelIndex"
          >
            {{ level.gym_grade.name }}
          </v-chip>
        </div>
      </div>
      <p
        v-else
        class="text-center mt-16 text--disabled"
      >
        {{ $t('components.gymStatistic.noData') }}
      </p>
    </div>
  </v-sheet>
</template>

<script>
import { mdiTag } from '@mdi/js'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'
import IndoorLevelChart from '~/components/logBooks/indoors/IndoorLevelChart.vue'

export default {
  name: 'GymStatisticLevelsChart',
  components: { IndoorLevelChart },
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
      levels: {},
      chartIndex: 0,

      mdiTag
    }
  },

  watch: {
    filters: {
      handler () {
        this.getGrades()
      },
      deep: true
    }
  },

  mounted () {
    this.getGrades()
  },

  methods: {
    getGrades () {
      this.loading = true
      new GymRouteStatisticApi(this.$axios, this.$auth)
        .levels(this.gym.id, this.filters)
        .then((resp) => {
          this.levels = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
