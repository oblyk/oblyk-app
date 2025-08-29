<template>
  <div
    class="grade-chart"
    :class="heightClass"
  >
    <bar-chart
      :data="chartData()"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
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
    <v-btn
      class="chart-to-png-btn"
      icon
      @click="chartToPng()"
    >
      <v-icon small>
        {{ mdiCamera }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiCamera } from '@mdi/js'
import { GradeMixin } from '@/mixins/GradeMixin'
const BarChart = () => import('~/components/charts/BarChart')

export default {
  name: 'LocalityGradeChart',
  components: { BarChart },
  mixins: [GradeMixin],
  props: {
    data: {
      type: Object,
      required: true
    },
    heightClass: {
      type: String,
      default: 'height-200'
    },
    screenShotTitle: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiCamera
    }
  },

  methods: {
    chartData () {
      const labels = []
      const data = []
      const backgroundColor = []

      // Grade data
      for (const level in this.data.levels) {
        data.push(this.data.levels[level])
      }

      // Background color data
      for (const index in this.gradeColorByValue) {
        if (index % 2 === 0) {
          backgroundColor.push(this.gradeColorByValue[index])
        }
      }

      // Labels data
      for (const index in this.gradeByValue) {
        if (index % 2 === 0) {
          labels.push(this.gradeByValue[index])
        }
      }

      return {
        datasets: [{
          data,
          backgroundColor,
          label: this.$t('common.number')
        }],
        labels
      }
    },

    chartToPng () {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style.display = 'none'
      document.querySelector('.grade-chart canvas').toBlob((blob) => {
        a.href = window.URL.createObjectURL(blob)
        a.download = `${this.screenShotTitle || 'capture-cotation'}.png`
        a.click()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.grade-chart {
  flex-grow: 1;
  min-height: 0;
  position: relative;

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

  .chart-to-png-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
