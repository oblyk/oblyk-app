<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiChartBar }}
      </v-icon>
      {{ $t('components.gymStatistic.gradeChartTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <indoor-grade-chart
        :data="grades"
        height-class="height-250"
      />
    </div>
  </v-sheet>
</template>

<script>
import { mdiChartBar } from '@mdi/js'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'
import IndoorGradeChart from '~/components/logBooks/indoors/IndoorGradeChart.vue'

export default {
  name: 'GymStatisticGradesChart',
  components: { IndoorGradeChart },
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
      grades: {},

      mdiChartBar
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
        .grades(this.gym.id, this.filters)
        .then((resp) => {
          this.grades = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
