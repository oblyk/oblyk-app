<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.evolution') }}
    </p>
    <div
      class="evolution-chart"
      :class="heightClass"
    >
      <line-chart
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: true, position: 'bottom' },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function(label, index, labels) {
                    const grades = [
                      '-',
                      '1a', '1a+', '1b', '1b+', '1c', '1c+',
                      '2a', '2a+', '2b', '2b+', '2c', '2c+',
                      '3a', '3a+', '3b', '3b+', '3c', '3c+',
                      '4a', '4a+', '4b', '4b+', '4c', '4c+',
                      '5a', '5a+', '5b', '5b+', '5c', '5c+',
                      '6a', '6a+', '6b', '6b+', '6c', '6c+',
                      '7a', '7a+', '7b', '7b+', '7c', '7c+',
                      '8a', '8a+', '8b', '8b+', '8c', '8c+',
                      '9a', '9a+', '9b', '9b+', '9c', '9c+'
                    ]
                    return grades[label]
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const grades = [
                  '',
                  '1a', '1a+', '1b', '1b+', '1c', '1c+',
                  '2a', '2a+', '2b', '2b+', '2c', '2c+',
                  '3a', '3a+', '3b', '3b+', '3c', '3c+',
                  '4a', '4a+', '4b', '4b+', '4c', '4c+',
                  '5a', '5a+', '5b', '5b+', '5c', '5c+',
                  '6a', '6a+', '6b', '6b+', '6c', '6c+',
                  '7a', '7a+', '7b', '7b+', '7c', '7c+',
                  '8a', '8a+', '8b', '8b+', '8c', '8c+',
                  '9a', '9a+', '9b', '9b+', '9c', '9c+'
                ]
                return `${data.datasets[tooltipItem.datasetIndex].label} : ${grades[tooltipItem.value]}`
              }
            }
          }
        }"
      />
    </div>
  </div>
</template>

<script>
const LineChart = () => import('~/components/charts/LineChart')

export default {
  name: 'LogBookEvolutionChart',
  components: { LineChart },
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
      const datasets = []
      for (const dataset of this.data.datasets) {
        datasets.push({
          borderColor: dataset.borderColor,
          data: dataset.data,
          fill: dataset.fill,
          label: this.$t(`models.climbs.${dataset.label}`)
        })
      }
      return {
        datasets,
        labels: this.data.labels
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

  &.height-200 {
    height: 200px
  }

  &.height-250 {
    height: 250px
  }
}
</style>
