<template>
  <v-container v-if="gym">
    <v-img
      dark
      height="300px"
      :lazy-src="gym.thumbnailBannerUrl"
      :src="gym.bannerUrl"
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
            v-if="gym.logoUrl"
            class="mr-1"
          >
            <v-img :src="gym.thumbnailLogoUrl" />
          </v-avatar>
          {{ gym.name }}
        </h1>
        <p class="subtitle-2 mt-n3" style="padding-left: 48px">
          {{ $t('components.gymRanking.rank') }}
        </p>
      </div>
    </v-img>

    <v-sheet
      class="rounded pa-3 mb-7 mt-2"
      style="position: relative"
    >
      <v-row>
        <v-col>
          <v-select
            v-model="query.date"
            :items="dates"
            item-text="text"
            item-value="value"
            :label="$t('common.month')"
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
        <v-col>
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

    <!-- Load ranking -->
    <v-row v-if="loadingScore">
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

    <div v-else>
      <div v-if="podiums.length > 0">
        <!-- Podiums -->
        <v-row>
          <!-- First -->
          <v-col
            cols="6"
            md="4"
            align-self="end"
            order="1"
            order-md="2"
          >
            <gym-ranking-podium
              v-if="!loadingScore && podiums.length >= 1"
              :rank="1"
              :points="podiums[0].points"
              :user="podiums[0].user"
              :click="getClimber"
            />
          </v-col>

          <!-- Second -->
          <v-col
            cols="6"
            md="4"
            align-self="end"
            order="2"
            order-md="1"
          >
            <gym-ranking-podium
              v-if="!loadingScore && podiums.length >= 2"
              :rank="2"
              :points="podiums[1].points"
              :user="podiums[1].user"
              :click="getClimber"
            />
          </v-col>

          <!-- Third -->
          <v-col
            cols="12"
            md="4"
            align-self="end"
            order="3"
          >
            <gym-ranking-podium
              v-if="!loadingScore && podiums.length >= 3"
              :rank="3"
              :points="podiums[2].points"
              :user="podiums[2].user"
              :click="getClimber"
            />
          </v-col>
        </v-row>

        <!-- Other climbers -->
        <v-list
          v-if="!loadingScore && scores.length >= 1"
          class="rounded mt-5"
        >
          <v-list-item
            v-for="(score, scoreIndex) in scores"
            :key="`score-index-${scoreIndex}`"
            @click="getClimber(score.user)"
          >
            <v-list-item-avatar>
              <v-img
                :src="score.user.thumbnailAvatarUrl"
                :alt="`avatar ${score.user.first_name}`"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ score.rank }}</strong> - {{ score.user.first_name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <strong>
                {{ score.points }}
              </strong>
              <small class="vertical-align-text-top">pts</small>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <p
        v-else
        class="text-center text--disabled my-7"
      >
        {{ $t('components.gymRanking.noRank', { date: humanizeDate(query.date, 'LLLL y') }) }}
      </p>
    </div>
    <down-to-close-dialog
      ref="climberDialog"
      v-model="climberDialog"
      wait-signal
    >
      <user-card
        v-if="!loadingClimber"
        :user="climber"
      />
    </down-to-close-dialog>
  </v-container>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import { TextHelpers } from '~/mixins/TextHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import User from '~/models/User'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import UserCard from '~/components/users/UserCard'
import UserApi from '~/services/oblyk-api/UserApi'
import GymRankingPodium from '~/components/gyms/GymRankingPodium'

export default {
  components: { GymRankingPodium, UserCard, DownToCloseDialog },
  meta: { orphanRoute: true },
  mixins: [GymConcern, DateHelpers, TextHelpers],

  data () {
    return {
      loadingScore: true,
      scores: [],
      podiums: [],
      climberDialog: false,
      loadingClimber: true,
      climber: null,
      query: {
        climbingType: 'all',
        gender: 'all',
        age: 'all',
        date: this.today().startOf('month').toISO()
      },
      genders: [
        { text: this.$t('models.genres.males_and_females'), value: 'all' },
        { text: this.$t('models.genres.male'), value: 'male' },
        { text: this.$t('models.genres.female'), value: 'female' }
      ],
      climbingTypes: [
        { text: this.$t('common.allTypes'), value: 'all' },
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
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

      mdiArrowLeft
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
      const dates = []
      const date = this.today().startOf('month')
      dates.push({ value: date.toISO(), text: this.capitalize(this.humanizeDate(date, 'LLLL y')) })
      for (let i = 0; i < 5; i++) {
        const loopDate = date.minus({ months: i + 1 })
        dates.push({
          value: loopDate.toISO(), text: this.capitalize(this.humanizeDate(loopDate, 'LLLL y'))
        })
      }
      return dates
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
      this.podiums = []
      this.loadingScore = true
      const params = {
        start_date: this.toDateTime(this.query.date).startOf('month'),
        end_date: this.toDateTime(this.query.date).endOf('month'),
        climbing_type: this.query.climbingType,
        gender: this.query.gender,
        age: this.query.age
      }
      new GymApi(this.$axios, this.$auth)
        .rank(this.$route.params.gymId, params)
        .then((resp) => {
          let index = 1
          for (const score of resp.data) {
            const scoreDate = {
              rank: score.rank,
              points: score.points,
              user: new User({ attributes: score.user })
            }
            if (index <= 3) {
              this.podiums.push(scoreDate)
            } else {
              this.scores.push(scoreDate)
            }
            index++
          }
        })
        .finally(() => {
          this.loadingScore = false
        })
    },

    getClimber (user) {
      this.loadingClimber = true
      this.climberDialog = true
      new UserApi(this.$axios, this.$auth)
        .find(user.slug_name)
        .then((resp) => {
          this.climber = new User({ attributes: resp.data })
          this.$refs.climberDialog.signal()
        })
        .finally(() => {
          this.loadingClimber = false
        })
    }
  }
}
</script>
