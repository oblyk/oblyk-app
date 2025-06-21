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
      <template v-slot:[`item.top_ratio`]="{ item }">
        <strong :style="`color: ${percentColorFunction(item.top_ratio)}`">
          {{ item.top_ratio }}%
        </strong>
      </template>
      <template v-slot:[`item.holds_chart`]="{ item }">
        <div
          class="hoverable"
          @click="openModal(item)"
        >
          <sparkbar
            :colors="item.colors_chart"
            :data="item.holds_chart"
          />
        </div>
      </template>
    </v-data-table>
    <v-dialog
      v-model="chartModal"
      width="700"
    >
      <v-card v-if="chartItem">
        <v-card-title>
          <v-chip outlined class="mr-2">
            LIGNE : {{ chartItem.number }}
          </v-chip>
          Évolution des prises atteintes
        </v-card-title>
        <div class="px-6 pb-4">
          <div class="holds-chart">
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
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'
import Sparkbar from '~/components/ui/Sparkbar'
import LineChart from '~/components/charts/LineChart'

export default {
  name: 'HighestHoldTable',
  components: { LineChart, Sparkbar, ContestRouteAvatar },
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        },
        tooltips: {
          intersect: false
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
          text: 'Nombre de top',
          align: 'start',
          sortable: true,
          value: 'top'
        },
        {
          text: 'Prise la plus haute',
          align: 'start',
          sortable: true,
          value: 'max_hold'
        },
        {
          text: 'Prise la plus basse',
          align: 'start',
          sortable: true,
          value: 'min_hold'
        },
        {
          text: 'Prise moyenne',
          align: 'start',
          sortable: true,
          value: 'average_hold'
        },
        {
          text: 'Nb. top / participant',
          align: 'start',
          sortable: true,
          value: 'top_ratio'
        },
        {
          text: 'Prises atteintes',
          align: 'start',
          sortable: false,
          value: 'holds_chart'
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
            top: route.top,
            max_hold: route.max_hold,
            min_hold: route.min_hold,
            holds_chart: route.holds_chart,
            colors_chart: route.colors_chart,
            average_hold: route.average_hold.toLocaleString(),
            top_ratio: route.top_ratio
          }
        )
      }
      return rows
    }
  },

  methods: {
    openModal (item) {
      const labels = []
      for (const index in item.holds_chart) {
        labels.push(`Prise : ${index}`)
      }
      this.chartItem = item
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Nb. participant·e à avoir atteint cette prise',
            data: item.holds_chart.map((item) => { return item > 0 ? item : null }),
            steppedLine: 'after',
            spanGaps: true,
            backgroundColor: 'rgba(106,27,154, 0.08)',
            borderColor: '#6A1B9A'
          }
        ]
      }
      this.chartModal = true
    }
  }
}
</script>

<style scoped lang="scss">
.holds-chart {
  flex-grow: 1;
  min-height: 0;
  height: 200px;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
