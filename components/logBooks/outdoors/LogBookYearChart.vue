<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.years') }}
    </p>
    <div
      class="year-chart"
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
const BarChart = () => import('~/components/charts/BarChart')

export default {
  name: 'LogBookYearChart',
  components: { BarChart },
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
      return {
        datasets: [{
          data: this.data.datasets[0].data,
          backgroundColor: this.data.datasets[0].backgroundColor,
          label: this.$t('common.number')
        }],
        labels: this.data.labels
      }
    }
  }
}
</script>

<style scoped lang="scss">
.year-chart {
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
