<template>
  <div class="mt-1">
    <!-- if visitor cannot see the logbook -->
    <div
      v-if="!currentUserCanSeeAscents()"
      class="text-center mt-10 mb-10"
    >
      <p>
        <v-icon large>
          {{ mdiLock }}
        </v-icon>
      </p>
      <p>
        {{ $t('components.user.privateLogBook', { name: user.first_name }) }}<br>
        {{ $t('components.user.subscribeToSee') }}
      </p>
    </div>

    <!-- if visitor is authorised -->
    <div v-else>
      <v-card class="pa-4">
        <spinner v-if="loadingFigures" :full-height="false" />
        <log-book-indoor-figures
          v-if="!loadingFigures && figures.ascents > 0"
          :figures="figures"
          :user="user"
        />
        <div
          v-if="!loadingFigures && figures.ascents === 0"
          class="py-5"
        >
          <p class="text-center mb-0">
            <small>
              {{ $t('components.user.emptyLogbook', { name: user.first_name}) }}
            </small>
          </p>
        </div>
      </v-card>

      <!-- Charts -->
      <div
        v-if="chartsPart"
        class="mt-4"
      >
        <!-- Climbing type & grade chart-->
        <v-row>
          <v-col cols="12" lg="3">
            <v-card class="pa-4">
              <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
              <log-book-climbing-type-chart
                v-if="!loadingClimbingTypeChart"
                :data="climbingTypeData"
                legend-position="right"
                height-class="height-250"
                legend
              />
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card class="pa-4">
              <spinner v-if="loadingGradeChart" :full-height="false" />
              <log-book-grade-chart
                v-if="!loadingGradeChart"
                :data="gradeData"
                height-class="height-250"
              />
            </v-card>
          </v-col>
          <v-col cols="12" lg="5">
            <v-card class="pa-4">
              <spinner v-if="loadingLevelChart" :full-height="false" />
              <div v-if="!loadingLevelChart">
                <div
                  v-for="(chartFor, chartForIndex) in levelData"
                  :key="`chartFor-index-${chartForIndex}`"
                >
                  <indoor-level-chart
                    v-if="chartFor.type === 'level_chart' && showLevelChartIndex === chartForIndex"
                    :data="chartFor.chart"
                    :show-title="true"
                    height-class="height-215"
                  />
                </div>
                <p
                  v-if="levelData.length > 1"
                  class="mb-0 mt-2 text-center"
                >
                  <v-btn
                    v-for="(chartFor, chartForIndex) in levelData"
                    :key="`chartFor-index-${chartForIndex}`"
                    small
                    text
                    outlined
                    class="mx-1"
                    @click="showLevelChartIndex = chartForIndex"
                  >
                    <span v-if="chartFor.type === 'level_chart'">
                      <v-icon
                        v-for="(colorSystemLine, colorSystemIndex) in chartFor.color_system.color_system_lines"
                        :key="`color-system-index-${colorSystemIndex}`"
                        :color="colorSystemLine.hex_color"
                        small
                      >
                        {{ mdiCircle }}
                      </v-icon>
                    </span>
                  </v-btn>
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiLock, mdiCircle } from '@mdi/js'
import LogBookIndoorFigures from '~/components/logBooks/indoors/LogBookIndoorFigures.vue'
import Spinner from '~/components/layouts/Spiner.vue'
import UserApi from '~/services/oblyk-api/UserApi'
import LogBookClimbingTypeChart from '~/components/logBooks/outdoors/LogBookClimbingTypeChart.vue'
import LogBookGradeChart from '~/components/logBooks/outdoors/LogBookGradeChart.vue'
import IndoorLevelChart from '~/components/logBooks/indoors/IndoorLevelChart.vue'
import { SubscribeConcern } from '~/concerns/SubscribeConcern'

export default {
  components: { IndoorLevelChart, LogBookGradeChart, LogBookClimbingTypeChart, Spinner, LogBookIndoorFigures },
  mixins: [SubscribeConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      chartsPart: false,

      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {},

      loadingLevelChart: true,
      showLevelChartIndex: 0,
      levelData: [],

      mdiLock,
      mdiCircle
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les croix outdoor de %{name}',
        metaDescription: 'Consulter les croix outdoor faites par %{name} tout au long de sa vie de grimpeur·euse'
      },
      en: {
        metaTitle: 'The outdoor ascents of %{name}',
        metaDescription: 'Consult the outdoor ascents made by %{name} throughout his climbing life'
      }
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('metaTitle', { name: this.user?.first_name })
    },
    userMetaDescription () {
      return this.$t('metaDescription', { name: this.user?.first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.path}/ascents/indoor`
      }
      return ''
    }
  },

  mounted () {
    if (this.currentUserCanSeeAscents()) {
      this.getFigures()
    }
  },

  methods: {
    currentUserCanSeeAscents () {
      // If user have public profil
      if (this.user.public_profile && this.user.public_indoor_ascents) { return true }

      // If user have public outdoor logbook
      if (this.$auth.loggedIn && this.user.public_indoor_ascents) { return true }

      // If current user is subscribed to user
      return (this.$auth.loggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    },

    getFigures () {
      this.loadingFigures = true
      new UserApi(this.$axios, this.$auth)
        .indoorFigures(this.user.uuid)
        .then((resp) => {
          this.figures = resp.data
          if (this.figures.ascents > 0) {
            this.chartsPart = true
            this.loadCharts()
          }
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    loadCharts () {
      this.getClimbingTypeChart()
      this.getGradeChart()
      this.getLevelChart()
    },

    getClimbingTypeChart () {
      this.loadingFigures = true
      new UserApi(this.$axios, this.$auth)
        .indoorClimbingTypeChart(this.user.uuid)
        .then((resp) => {
          this.climbingTypeData = resp.data
        })
        .finally(() => {
          this.loadingClimbingTypeChart = false
        })
    },

    getGradeChart () {
      this.loadingGradeChart = true
      new UserApi(this.$axios, this.$auth)
        .indoorGradeChart(this.user.uuid)
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    },

    getLevelChart () {
      this.loadingLevelChart = true
      new UserApi(this.$axios, this.$auth)
        .indoorByLevelsChart(this.user.uuid)
        .then((resp) => {
          this.levelData = resp.data
        })
        .finally(() => {
          this.loadingLevelChart = false
        })
    }
  }
}
</script>
