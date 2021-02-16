<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.climbingType') }}
    </p>
    <div class="climbing-type-chart height-140">
      <doughnut-chart
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false }
        }"
      />
    </div>
    <!-- Climbing type legend -->
    <climbing-type-legend class="mt-3" />
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart'
import ClimbingTypeLegend from '@/components/ui/ClimbingTypeLegend'

export default {
  name: 'LogBookClimbingTypeChart',
  components: { ClimbingTypeLegend, DoughnutChart },
  props: {
    data: Object
  },

  methods: {
    chartData: function () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.$t(`models.climbs.${label}`))
      }
      return {
        datasets: this.data.datasets,
        labels: labels
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
}
</style>
