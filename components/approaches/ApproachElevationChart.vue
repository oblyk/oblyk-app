<template>
  <div>
    <p class="font-weight-bold">
      <v-icon small left>
        {{ mdiChartTimelineVariant }}
      </v-icon>
      {{ $t('components.approach.elevation_chart') }}
    </p>
    <div
      class="evolution-chart"
      :class="heightClass"
    >
      <line-chart
        v-if="approach.path_metadata"
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false, position: 'bottom' },
          animation: false,
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }"
      />
    </div>
  </div>
</template>

<script>
import { mdiChartTimelineVariant } from '@mdi/js'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'ApproachElevationChart',
  components: { LineChart },
  props: {
    approach: {
      type: Object,
      required: true
    },
    heightClass: {
      type: String,
      default: 'height-200'
    }
  },

  data () {
    return {
      mdiChartTimelineVariant
    }
  },

  methods: {
    chartData () {
      const data = []
      for (const point of this.approach.path_metadata) {
        data.push({
          x: point.cumulative_distance,
          y: point.elevation
        })
      }
      return {
        datasets: [{
          borderColor: 'rgb(76, 175, 80)',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          data,
          label: this.$t('models.approach.elevation')
        }]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.evolution-chart {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }

  &.height-150 {
    height: 150px
  }

  &.height-200 {
    height: 200px
  }

  &.height-250 {
    height: 250px
  }
}
</style>
