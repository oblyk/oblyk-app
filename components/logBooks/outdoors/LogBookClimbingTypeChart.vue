<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.climbingType') }}
    </p>
    <div
      class="climbing-type-chart"
      :class="heightClass"
    >
      <doughnut-chart
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: legend,
            position: legendPosition
          }
        }"
      />
    </div>
  </div>
</template>

<script>
const DoughnutChart = () => import('~/components/charts/DoughnutChart')

export default {
  name: 'LogBookClimbingTypeChart',
  components: { DoughnutChart },
  props: {
    data: {
      type: Object,
      default: () => ({ labels: [], datasets: [] })
    },
    legend: Boolean,
    heightClass: {
      type: String,
      default: 'height-140'
    },
    legendPosition: {
      type: String,
      default: 'top'
    }
  },

  methods: {
    chartData () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.$t(`models.climbs.${label}`))
      }
      return {
        datasets: this.data.datasets,
        labels
      }
    }
  }
}
</script>

<style lang="scss">
.climbing-type-chart {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }

  &.height-140 {
    height: 140px
  }

  &.height-250 {
    height: 250px
  }
}
</style>
