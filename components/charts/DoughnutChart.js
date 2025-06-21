import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },

  watch: {
    data () {
      this.renderChart(this.data, this.options)
    }
  },

  mounted () {
    this.renderChart(this.data, this.options)
  }
}
