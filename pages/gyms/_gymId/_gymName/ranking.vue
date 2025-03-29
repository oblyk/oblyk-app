<template>
  <v-container v-if="gym">
    <v-img
      dark
      height="300px"
      :lazy-src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%"
      class="rounded align-end"
    >
      <template #placeholder>
        <div class="gym-header-banner-spinner">
          <v-progress-circular
            indeterminate
            color="white"
          />
        </div>
      </template>
      <v-btn
        elevation="0"
        color="black"
        style="position: absolute; top: 5px; left: 5px"
        @click="$router.go(-1)"
      >
        <v-icon left>
          {{ mdiArrowLeft }}
        </v-icon>
        {{ gym.name }}
      </v-btn>
      <div class="pb-2 text-center">
        <h1>
          <v-avatar
            v-if="gym.attachments.logo.attached"
            class="mr-1"
          >
            <v-img :src="imageVariant(gym.attachments.logo, { fit: 'crop', width: 100, height: 100 })" />
          </v-avatar>
          {{ gym.name }}
        </h1>
        <p class="subtitle-2 mt-n3" style="padding-left: 48px">
          {{ $t('components.gymRanking.rank') }}
        </p>
      </div>
    </v-img>

    <v-sheet
      class="rounded pa-3 mt-2"
      style="position: relative"
    >
      <v-row>
        <v-col>
          <v-select
            v-model="query.date"
            :items="dates"
            item-text="text"
            item-value="value"
            :label="$t('common.period')"
            outlined
            hide-details
            dense
            @input="getRank()"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="query.age"
            :items="ages"
            item-text="text"
            item-value="value"
            :label="$t('components.input.age')"
            outlined
            hide-details
            dense
            @input="getRank()"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="query.gender"
            :items="genders"
            item-text="text"
            item-value="value"
            :label="$t('components.input.genre')"
            outlined
            hide-details
            dense
            @input="getRank()"
          />
        </v-col>
        <v-col v-if="climbingTypes.length > 2">
          <v-select
            v-model="query.climbingType"
            :items="climbingTypes"
            item-text="text"
            item-value="value"
            :label="$t('components.input.climbing_type')"
            outlined
            hide-details
            dense
            @input="getRank()"
          />
        </v-col>
      </v-row>
    </v-sheet>

    <contest-up-coming
      v-if="gym.upcoming_contests.length > 0"
      :gym="gym"
      class="mt-4"
    />

    <!-- Load ranking -->
    <v-row
      v-if="loadingScore"
      class="mt-7"
    >
      <!-- First -->
      <v-col
        cols="6"
        md="4"
        align-self="end"
        order="1"
        order-md="2"
      >
        <v-skeleton-loader type="avatar" width="50" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="70" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="110" class="mb-4 mx-auto" />
        <v-skeleton-loader type="image" height="150" />
      </v-col>

      <!-- Second -->
      <v-col
        cols="6"
        md="4"
        align-self="end"
        order="2"
        order-md="1"
      >
        <v-skeleton-loader type="avatar" width="50" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="70" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="110" class="mb-4 mx-auto" />
        <v-skeleton-loader type="image" height="100" />
      </v-col>

      <!-- Third -->
      <v-col
        cols="12"
        md="4"
        align-self="end"
        order="3"
      >
        <v-skeleton-loader type="avatar" width="50" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="70" class="mb-2 mx-auto" />
        <v-skeleton-loader type="text" width="110" class="mb-4 mx-auto" />
        <v-skeleton-loader type="image" height="70" />
      </v-col>
    </v-row>

    <div
      v-else
      class="mt-4"
    >
      <v-alert
        v-if="myScore"
        text
        :icon="mdiMedal"
        type="info"
      >
        <v-row align="center">
          <v-col class="grow">
            {{ $tc('components.gymRanking.myRank', myScore.rank, { count: myScore.rank }) }}
          </v-col>
          <v-col class="shrink">
            <v-btn
              text
              small
              color="blue"
              @click="goToRank(myScore.rank)"
            >
              {{ $t('actions.see') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>

      <v-simple-table v-if="!loadingScore && scores.length > 0">
        <template #default>
          <tbody>
            <tr
              v-for="(score, scoreIndex) in scores"
              :id="`score-rank-${score.rank}`"
              :key="`score-index-${scoreIndex}`"
              :class="myScore && myScore.user.slug_name === score.user.slug_name ? 'blue--text' : null"
            >
              <td class="smallest-table-column text-center">
                <v-icon
                  v-if="score.rank <= 3"
                  :color="podiumIconAndColor[score.rank].color"
                >
                  {{ mdiMedal }}
                </v-icon>
                <strong v-else>
                  {{ score.rank }}
                </strong>
              </td>
              <td class="smallest-table-column px-0">
                <v-chip
                  class="pl-1"
                  :color="myScore && myScore.user.slug_name === score.user.slug_name ? 'blue lighten-2' : null"
                  @click="getAscents(score)"
                >
                  <v-avatar class="mr-2">
                    <v-img
                      :src="imageVariant(score.user.attachments.avatar, { fit: 'crop', width: 100, height: 100 })"
                      :alt="`avatar ${score.user.first_name}`"
                    />
                  </v-avatar>
                  <strong>
                    {{ score.user.first_name }}
                  </strong>
                </v-chip>
              </td>
              <td class="px-1 py-1 text-no-wrap">
                <div
                  v-for="(chart, chartIndex) in score.charts"
                  :key="`chart-${chartIndex}`"
                  class="border rounded-sm pa-1 d-inline-block mr-1"
                  @click="getAscents(score, chart.climbing_type)"
                >
                  <sparkbar
                    :colors="chart.colors"
                    :data="chart.data"
                    :bar-width="7"
                    :gutter="2"
                    :height="40"
                    :title="$t(`models.climbs.${chart.climbing_type}`).toLowerCase()"
                    :title-color="$vuetify.theme.dark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'"
                  />
                </div>
              </td>
              <td class="smallest-table-column">
                <strong>
                  {{ score.points.toLocaleString() }}
                </strong>
                <small>pts</small>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <p
        v-else
        class="text-center text--disabled my-7"
      >
        {{ $t('components.gymRanking.noRank') }}
      </p>
    </div>

    <!-- Dialog for climber results -->
    <down-to-close-dialog
      ref="dialog"
      v-model="dialog"
      wait-signal
    >
      <v-list-item v-if="ascentScoreAndUser">
        <v-list-item-avatar>
          <v-avatar>
            <v-img
              :src="imageVariant(ascentScoreAndUser.user.attachments.avatar, { fit: 'crop', width: 100, height: 100 })"
              :alt="`avatar ${ascentScoreAndUser.user.first_name}`"
            />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ ascentScoreAndUser.user.first_name }}
            <v-btn
              small
              left
              elevation="0"
              :to="`/climbers/${ascentScoreAndUser.user.slug_name}`"
            >
              {{ $t('actions.see') }}
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ ascentScoreAndUser.points.toLocaleString() }} <small>points</small>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <strong>
            {{ $tc('components.gymRanking.rankNumber', ascentScoreAndUser.rank, { number: ascentScoreAndUser.rank }) }}
          </strong>
        </v-list-item-action>
      </v-list-item>
      <v-chip-group
        v-if="climbingTabs.length > 1"
        v-model="ascentClimbingType"
        active-class="primary"
      >
        <v-chip
          v-for="climbingType in climbingTabs"
          :key="climbingType.value"
          :value="climbingType.value"
        >
          {{ climbingType.text }}
        </v-chip>
      </v-chip-group>
      <ascent-gym-route-points
        v-if="ascentScoreAndUser && ascentClimbingType"
        :date="query.date"
        :gym="gym"
        :score-and-user="ascentScoreAndUser"
        :climbing-type="ascentClimbingType"
        :signal-callback="dialogSignal"
      />
    </down-to-close-dialog>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiMedal } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import { TextHelpers } from '~/mixins/TextHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import User from '~/models/User'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import ContestUpComing from '~/components/gyms/ContestUpComing'
import Sparkbar from '~/components/ui/Sparkbar'
import AscentGymRoutePoints from '~/components/ascentGymRoutes/AscentGymRoutePoints'

export default {
  components: { AscentGymRoutePoints, Sparkbar, ContestUpComing, DownToCloseDialog },
  meta: { orphanRoute: true },
  mixins: [GymConcern, DateHelpers, TextHelpers, ImageVariantHelpers],

  data () {
    return {
      loadingScore: true,
      scores: [],
      podiumIconAndColor: {
        1: { color: 'amber' },
        2: { color: 'blue-grey' },
        3: { color: 'brown' }
      },
      dialog: false,
      ascentClimbingType: null,
      ascentScoreAndUser: null,
      myScore: null,
      query: {
        climbingType: 'all',
        gender: 'all',
        age: 'all',
        date: 'opened'
      },
      genders: [
        { text: this.$t('models.genres.males_and_females'), value: 'all' },
        { text: this.$t('models.genres.male'), value: 'male' },
        { text: this.$t('models.genres.female'), value: 'female' }
      ],
      ages: [
        { text: this.$t('models.ages.all'), value: 'all' },
        { text: this.$t('models.ages.U8'), value: 'U8' },
        { text: this.$t('models.ages.U10'), value: 'U10' },
        { text: this.$t('models.ages.U12'), value: 'U12' },
        { text: this.$t('models.ages.U14'), value: 'U14' },
        { text: this.$t('models.ages.U16'), value: 'U16' },
        { text: this.$t('models.ages.U18'), value: 'U18' },
        { text: this.$t('models.ages.U20'), value: 'U20' },
        { text: this.$t('models.ages.senior'), value: 'senior' },
        { text: this.$t('models.ages.A40'), value: 'A40' },
        { text: this.$t('models.ages.A50'), value: 'A50' },
        { text: this.$t('models.ages.A60'), value: 'A60' }
      ],

      mdiArrowLeft,
      mdiMedal
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription', { name: this.gym?.name }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle', { name: this.gym?.name }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription', { name: this.gym?.name }) }
      ]
    }
  },

  computed: {
    dates () {
      const dates = [{ value: 'opened', text: this.$t('components.gymRanking.allOpenedRoutes') }]
      const date = this.today().startOf('month')
      dates.push({ value: date.toISO(), text: this.capitalize(this.humanizeDate(date, 'LLLL y')) })
      for (let i = 0; i < 5; i++) {
        const loopDate = date.minus({ months: i + 1 })
        dates.push({
          value: loopDate.toISO(), text: this.capitalize(this.humanizeDate(loopDate, 'LLLL y'))
        })
      }
      return dates
    },

    climbingTypes () {
      const types = [{ text: this.$t('common.allTypes'), value: 'all' }]
      for (const level in this.gym?.levels) {
        if (this.gym.levels[level].enabled) {
          types.push({ text: this.$t(`models.climbs.${this.gym.levels[level].climbing_type}`), value: this.gym.levels[level].climbing_type })
        }
      }
      return types
    },

    climbingTabs () {
      const types = []
      for (const level in this.gym?.levels) {
        if (this.gym.levels[level].enabled) {
          types.push({ text: this.$t(`models.climbs.${this.gym.levels[level].climbing_type}`), value: this.gym.levels[level].climbing_type })
        }
      }
      return types
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Le classement de %{name}',
        metaDescription: "Voir le classement des grimpeurs et grimpeuses de la salle d'escalade %{name}"
      },
      en: {
        metaTitle: "%{name}'s ranking",
        metaDescription: 'See the ranking of climbers in the climbing gym %{name}'
      }
    }
  },

  mounted () {
    this.getRank()
  },

  methods: {
    getRank () {
      this.scores = []
      this.loadingScore = true
      this.myScore = null
      const params = {
        climbing_type: this.query.climbingType,
        gender: this.query.gender,
        age: this.query.age
      }
      if (this.query.date !== 'opened') {
        params.start_date = this.toDateTime(this.query.date).startOf('month')
        params.end_date = this.toDateTime(this.query.date).endOf('month')
      }
      new GymApi(this.$axios, this.$auth)
        .rank(this.$route.params.gymId, params)
        .then((resp) => {
          for (const score of resp.data) {
            const scoreDate = {
              rank: score.rank,
              points: score.points,
              charts: score.charts,
              user: new User({ attributes: score.user })
            }
            this.scores.push(scoreDate)

            // Store login user score
            if (this.myScore === null && this.$auth.loggedIn && this.$auth.user.slug_name === score.user.slug_name) {
              this.myScore = scoreDate
            }
          }
        })
        .finally(() => {
          this.loadingScore = false
        })
    },

    dialogSignal () {
      this.$refs.dialog.signal()
    },

    getAscents (scoreAndUser, climbingType = null) {
      if (climbingType === null) {
        this.ascentClimbingType = this.climbingTabs[0].value
      } else {
        this.ascentClimbingType = climbingType
      }
      this.ascentScoreAndUser = scoreAndUser
      this.dialog = true
      this.$refs.dialog.signal()
    },

    goToRank (rank) {
      const tr = document.getElementById(`score-rank-${rank}`)
      tr.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>
