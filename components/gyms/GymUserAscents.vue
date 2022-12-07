<template>
  <v-card class="rounded">
    <v-card-text>
      <!-- Loading user ascents -->
      <div v-if="loadingUserAscents">
        <v-skeleton-loader type="list-item-two-line" />
      </div>

      <!-- User ascents -->
      <div v-if="!loadingUserAscents && haveAscent">
        <v-row>
          <v-col cols="12" md="7">
            <h2 class="h2-title-in-card-title mb-4">
              <v-icon left>
                {{ mdiFormatListChecks }}
              </v-icon>
              {{ $t('components.logBook.myAscentsHere') }}
            </h2>
            <v-row>
              <v-col cols="12" md="5">
                <v-sheet class="pt-11 pb-1 rounded-sm back-app-color">
                  <p class="mb-9 text-center">
                    <span class="text-h2">
                      {{ stats.ascents_count }}
                    </span>
                    <span class="text--disabled">{{ $t('common.ascents') }}</span>
                  </p>
                  <p class="mb-0 text-center text-no-wrap">
                    <span v-html="$t('components.ascentGymRoute.cumulativeHeight', { meter: stats.cumulative_height })" />
                    <v-icon v-if="stats.max_grade.text">
                      {{ mdiCircleSmall }}
                    </v-icon>
                    <span
                      v-if="stats.max_grade.text"
                      v-html="$t('components.ascentGymRoute.maxGrade', { grade: stats.max_grade.text})"
                    />
                  </p>
                  <p class="text-center mb-1 font-italic">
                    <small>
                      {{ $t('common.since', { date: humanizeDate(stats.dates.first) }) }}
                    </small>
                  </p>
                </v-sheet>
                <v-btn
                  class="mt-4"
                  text
                  outlined
                  block
                  color="primary"
                >
                  {{ $t('actions.addMyAscents') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="7">
                <div
                  v-for="(chartFor, chartForIndex) in stats.charts"
                  :key="`chartFor-index-${chartForIndex}`"
                >
                  <indoor-grade-chart
                    v-if="chartFor.type === 'grade_chart' && showChartIndex === chartForIndex"
                    :data="chartFor.chart"
                  />
                  <indoor-level-chart
                    v-if="chartFor.type === 'level_chart' && showChartIndex === chartForIndex"
                    :data="chartFor.chart"
                  />
                </div>
                <p
                  v-if="stats.charts.length > 1"
                  class="mb-0 mt-1 text-center"
                >
                  <v-btn
                    v-for="(chartFor, chartForIndex) in stats.charts"
                    :key="`chartFor-index-${chartForIndex}`"
                    small
                    text
                    outlined
                    class="mx-1"
                    @click="showChartIndex = chartForIndex"
                  >
                    <span v-if="chartFor.type === 'grade_chart'">
                      Cotation
                    </span>
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
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5">
            <div
              style="height: 290px;"
              class="overflow-y-auto overflow-x-hidden"
            >
              <climbing-session
                :filters="{ gym_ids: gym.id }"
              />
            </div>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="!loadingUserAscents && !haveAscent"
        class="text-center py-3"
      >
        <p class="mb-2">
          {{ $t('components.ascentGymRoute.noAscents') }}
        </p>

        <v-btn
          text
          outlined
          color="primary"
        >
          {{ $t('actions.addMyAscents') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatListChecks, mdiCircleSmall, mdiCircle } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import LogBookIndoorApi from '~/services/oblyk-api/LogBookIndoorApi'
import IndoorGradeChart from '~/components/logBooks/indoors/IndoorGradeChart.vue'
import IndoorLevelChart from '~/components/logBooks/indoors/IndoorLevelChart.vue'
import ClimbingSession from '~/components/climbingSessions/ClimbingSession.vue'

export default {
  name: 'GymUserAscents',
  components: { ClimbingSession, IndoorLevelChart, IndoorGradeChart },
  mixins: [DateHelpers],

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingUserAscents: true,
      stats: {},
      showChartIndex: 0,

      mdiFormatListChecks,
      mdiCircleSmall,
      mdiCircle
    }
  },

  computed: {
    haveAscent () {
      return this.stats?.ascents_count > 0
    }
  },

  mounted () {
    this.getGymUserAscents()
  },

  methods: {
    getGymUserAscents () {
      this.loadingUserAscents = false
      new LogBookIndoorApi(this.$axios, this.$auth)
        .simpleStatsByGyms({
          gym_id: this.gym.id
        })
        .then((resp) => {
          this.stats = resp.data[0]
        })
    }
  }
}
</script>
