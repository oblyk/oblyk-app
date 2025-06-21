<template>
  <v-sheet class="rounded pa-4 mt-2">
    <div class="d-flex align-center">
      <p class="font-weight-bold mb-0">
        <v-icon left class="vertical-align-top">
          {{ mdiAccountMultiple }}
        </v-icon>
        Participants, participantes
      </p>
      <v-btn
        icon
        class="ml-auto"
        @click="showGraph = !showGraph"
      >
        <v-icon>
          {{ showGraph ? mdiChevronDown : mdiChevronUp }}
        </v-icon>
      </v-btn>
    </div>
    <div
      v-if="showGraph"
      class="mt-4"
    >
      <v-row no-gutters>
        <v-col cols="12" md="2" class="d-flex flex-column">
          <v-sheet class="text-center rounded-sm back-app-color py-6 mb-2 flex-grow-1">
            <p class="mb-n1 text-h3">
              {{ statistics.participants.figures.total }}
            </p>
            <p class="mb-0">
              Participants
            </p>
            <small class="text-no-wrap">
              {{ (Math.round(statistics.participants.by_ages.average * 10) / 10).toLocaleString() }} ans d'âge moyen
            </small>
          </v-sheet>
          <v-row no-gutters class="flex-shrink-0">
            <v-col cols="6" class="pr-1">
              <v-sheet class="pa-2 text-center rounded-sm back-app-color full-width">
                <p class="mb-0 text-no-wrap">
                  <strong>{{ statistics.participants.figures.male }}</strong>
                  <small class="font-italic">
                    {{ Math.round(statistics.participants.figures.male / statistics.participants.figures.total * 100) }}%
                  </small>
                </p>
                Hommes
              </v-sheet>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-sheet class="pa-2 text-center rounded-sm back-app-color full-width">
                <p class="mb-0">
                  <strong>
                    {{ statistics.participants.figures.female }}
                  </strong>
                  <small class="font-italic">
                    {{ Math.round(statistics.participants.figures.female / statistics.participants.figures.total * 100) }}%
                  </small>
                </p>
                Femmes
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <div class="border rounded-sm px-2 pb-2 pt-1 mx-2 full-height">
            <p class="font-weight-medium mb-3">
              Répartition Homme / Femme
            </p>
            <div class="contest-male-female-chart">
              <doughnut-chart :data="maleFemaleRatioData" :options="maleFemaleChartOptions" />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="border px-2 pb-1 pt-1 rounded-sm full-height">
            <p class="font-weight-medium mb-3">
              Nombre de participant·e par âge
            </p>
            <div class="contest-ages-chart">
              <bar-chart :data="agesData" :options="agesChartOptions" />
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="border rounded-sm pa-2 mt-2">
        <strong class="purple--text text--darken-3">{{ statistics.participants.figures.without_ascents }}</strong> participant·e·s sans aucune ascensions,
        soit un taux de participation de <strong class="purple--text text--darken-3">{{ statistics.participants.figures.participation }}%</strong>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiAccountMultiple, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import BarChart from '~/components/charts/BarChart'
import DoughnutChart from '~/components/charts/DoughnutChart'

export default {
  name: 'ContestParticipantsStatistics',
  components: { BarChart, DoughnutChart },
  props: {
    statistics: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showGraph: true,
      maleFemaleChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'right'
        }
      },
      agesChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom'
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },

      mdiAccountMultiple,
      mdiChevronDown,
      mdiChevronUp
    }
  },

  computed: {
    maleFemaleRatioData () {
      return {
        labels: [
          'Homme',
          'Femme'
        ],
        datasets: [{
          data: [
            this.statistics.participants.figures.male,
            this.statistics.participants.figures.female
          ],
          backgroundColor: ['#7B1FA2', '#AB47BC']
        }]
      }
    },

    agesData () {
      return {
        labels: this.statistics.participants.by_ages.ages.map(age => age.age),
        datasets: [
          {
            label: 'Nombre de participant·e par age',
            data: this.statistics.participants.by_ages.ages.map(age => age.count),
            backgroundColor: '#6A1B9A'
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.contest-male-female-chart {
  flex-grow: 1;
  min-height: 0;
  height: 160px;
  width: 300px;

  > div {
    position: relative;
    height: 100%;
  }
}
.contest-ages-chart {
  flex-grow: 1;
  min-height: 0;
  height: 166px;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
