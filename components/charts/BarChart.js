import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
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
