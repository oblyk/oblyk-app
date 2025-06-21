<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="-1"
      dense
      class="rounded border"
    >
      <template v-slot:[`item.attachments`]="{ item }">
        <contest-route-avatar :contest-route="item" />
      </template>
      <template v-slot:[`item.number`]="{ item }">
        <v-chip @click="clickCallback(item.id)">
          {{ item.number }}
        </v-chip>
      </template>
      <template v-slot:[`item.times_chart`]="{ item }">
        <v-btn
          outlined
          text
          small
          @click="openModal(item)"
        >
          Graph des temps
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="chartModal"
      width="800"
    >
      <v-card v-if="chartItem">
        <v-card-title>
          <v-chip outlined class="mr-2">
            LIGNE : {{ chartItem.number }}
          </v-chip>
          Graph des temps
        </v-card-title>
        <div class="px-6 pb-4">
          <div class="times-chart">
            <line-chart
              v-if="chartData"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'BestTimesTable',
  components: { LineChart, ContestRouteAvatar },
  mixins: [DateHelpers],
  props: {
    routes: {
      type: Array,
      required: true
    },
    clickCallback: {
      type: Function,
      required: true
    },
    percentColorFunction: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      chartModal: false,
      chartItem: null,
      chartData: null,
      chartKey: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animations: false,
        legend: {
          display: false,
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              callback (value) {
                const time = new Date(value).toLocaleTimeString(
                  ['fr-FR'],
                  { minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }
                )
                const timeSplit = time.split(':')
                const minute = timeSplit[0]
                const second = timeSplit[1].split(',')[0]
                const millisecond = timeSplit[1].split(',')[1]

                return `${minute}m ${second}s ${millisecond}ms`
              }
            }
          }]
        },
        tooltips: {
          intersect: false,
          callbacks: {
            label (tooltipItem, data) {
              const label = data.datasets[tooltipItem.datasetIndex].label || ''
              const time = new Date(tooltipItem.yLabel).toLocaleTimeString(
                ['fr-FR'],
                { minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 }
              )
              const timeSplit = time.split(':')
              const minute = timeSplit[0]
              const second = timeSplit[1].split(',')[0]
              const millisecond = timeSplit[1].split(',')[1]

              return `${label} : ${minute}m ${second}s ${millisecond}ms`
            }
          }
        }
      },
      headers: [
        {
          text: 'Photo',
          align: 'start',
          sortable: false,
          value: 'attachments'
        },
        {
          text: 'Numéro',
          align: 'start',
          sortable: true,
          value: 'number'
        },
        {
          text: 'Meilleurs temps',
          align: 'start',
          sortable: true,
          value: 'best_time'
        },
        {
          text: 'Moins bon temps',
          align: 'start',
          sortable: true,
          value: 'worst_time'
        },
        {
          text: 'Temps moyen',
          align: 'start',
          sortable: true,
          value: 'average_time'
        },
        {
          text: '',
          align: 'end',
          sortable: false,
          value: 'times_chart'
        }
      ]
    }
  },

  computed: {
    items () {
      const rows = []
      for (const route of this.routes) {
        rows.push(
          {
            attachments: route.attachments,
            id: route.id,
            number: route.number,
            best_time: this.humanizeDate(route.best_time, "mm'm' ss's' SSS'ms'"),
            worst_time: this.humanizeDate(route.worst_time, "mm'm' ss's' SSS'ms'"),
            times_chart: route.times_chart,
            colors_chart: route.colors_chart,
            average_time: this.humanizeDate(route.average_time, "mm'm' ss's' SSS'ms'")
          }
        )
      }
      return rows
    }
  },

  methods: {
    openModal (item) {
      this.chartData = null
      this.chartModal = true
      const labels = []
      const timeChart = []
      for (const itemChart of item.times_chart) {
        timeChart.push({ ...itemChart })
      }
      for (const index in timeChart) {
        const rank = timeChart.length - index
        labels.push(`${rank}${rank <= 1 ? 'er' : 'ème'}`)
      }
      this.chartItem = item
      for (const index in timeChart) {
        timeChart[index].y = new Date(timeChart[index].y)
      }
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Temps',
            data: timeChart,
            borderColor: '#6A1B9A',
            backgroundColor: 'rgba(106, 27, 154, 0.08)',
            tension: 0
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.times-chart {
  flex-grow: 1;
  min-height: 0;
  height: 350px;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
