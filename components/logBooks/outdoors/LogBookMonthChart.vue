<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.months') }}
    </p>
    <div
      class="month-chart"
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
  name: 'LogBookMonthChart',
  components: { BarChart },
  mixins: [DateHelpers],
  props: {
    data: Object,
    heightClass: {
      type: String,
      default: 'height-200'
    }
  },

  methods: {
    chartData () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.humanizeDate(`${label}-01`, 'LLLL yyyy'))
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
.month-chart {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }

  &.height-200 {
    height: 200px
  }

  &.height-250 {
    height: 250px
  }
}
</style>
