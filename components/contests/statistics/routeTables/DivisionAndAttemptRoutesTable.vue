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
      <template v-slot:[`item.top_by_attempt`]="{ item }">
        <div
          class="hoverable"
          @click="openModal(item)"
        >
          <sparkbar :colors="item.top_by_attempt_colors" :data="item.top_by_attempt" />
        </div>
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
          Nombre d'essais nécessaire aux participant·es pour toper
        </v-card-title>
        <div class="px-6 pb-4">
          <div class="top-by-attempt-chart">
            <bar-chart
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
import BarChart from '~/components/charts/BarChart'

export default {
  name: 'DivisionAndAttemptRoutesTable',
  components: { BarChart, Sparkbar, ContestRouteAvatar },
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
        animations: false,
        legend: {
          display: false,
          position: 'bottom'
        },
        tooltips: {
          intersect: false,
          callbacks: {
            label (tooltipItem) {
              const indexText = tooltipItem.index === 0 ? '1er' : `${tooltipItem.index + 1}ème`
              return `${tooltipItem.value} participant·e·s ont fait au ${indexText} essais`
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
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
          text: "Nombre d'essais",
          align: 'start',
          sortable: true,
          value: 'top_attempt'
        },
        {
          text: "Nombre d'essais moyen",
          align: 'start',
          sortable: true,
          value: 'attempt_average'
        },
        {
          text: 'Nb. top / participant',
          align: 'start',
          sortable: true,
          value: 'top_ratio'
        },
        {
          text: "Top par nombre d'essais",
          align: 'start',
          sortable: false,
          value: 'top_by_attempt'
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
            top_by_attempt: route.top_by_attempt,
            top_by_attempt_colors: route.top_by_attempt_colors,
            top_attempt: route.top_attempt,
            attempt_average: route.attempt_average.toLocaleString(),
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
      for (const index in item.top_by_attempt) {
        if (parseInt(index) === 0) {
          labels.push('Flash !')
        } else {
          labels.push(`${parseInt(index) + 1}ème essais`)
        }
      }
      this.chartItem = item
      this.chartData = {
        labels,
        datasets: [
          {
            label: "Nombre d'essais pour toper",
            data: item.top_by_attempt,
            backgroundColor: 'rgb(106,27,154)'
          }
        ]
      }
      this.chartModal = true
    }
  }
}
</script>

<style scoped lang="scss">
.top-by-attempt-chart {
  flex-grow: 1;
  min-height: 0;
  height: 200px;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
