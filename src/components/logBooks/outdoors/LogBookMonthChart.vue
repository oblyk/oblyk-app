<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.months') }}
    </p>
    <div
      class="month-chart"
      v-bind:class="heightClass"
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
import BarChart from '@/components/charts/BarChart'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'LogBookMonthChart',
  mixins: [DateHelpers],
  components: { BarChart },
  props: {
    data: Object,
    heightClass: {
      type: String,
      default: 'height-200'
    }
  },

  methods: {
    chartData: function () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.humanizeDate(`${label}-01`, 'MMMM YYYY'))
      }

      return {
        datasets: [{
          data: this.data.datasets[0].data,
          backgroundColor: this.data.datasets[0].backgroundColor,
          label: this.$t('common.number')
        }],
        labels: labels
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
