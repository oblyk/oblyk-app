<template>
  <div>
    <div
      class="opening-frequencies-chart"
      :class="heightClass"
    >
      <bar-chart
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }"
      />
    </div>
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
const BarChart = () => import('~/components/charts/BarChart')

export default {
  name: 'IndoorOpeningFrequenciesChart',
  components: { BarChart },
  mixins: [DateHelpers],
  props: {
    data: {
      type: Object,
      required: true
    },
    heightClass: {
      type: String,
      default: 'height-200'
    }
  },

  methods: {
    chartData () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.humanizeDate(label, 'DATE_SHORT'))
      }

      return {
        datasets: [{
          data: this.data.datasets[0].data,
          backgroundColor: this.data.datasets[0].backgroundColor,
          label: this.$t('common.number')
        }],
        labels
      }
    }
  }
}
</script>

<style scoped lang="scss">
.opening-frequencies-chart {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }

  &.height-200 {
    height: 200px
  }
}
</style>
