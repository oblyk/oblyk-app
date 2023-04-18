<template>
  <v-container v-if="gym">
    <div>
      <v-btn
        outlined
        text
        @click="$router.go(-1)"
      >
        <v-icon left>
          {{ mdiArrowLeft }}
        </v-icon>
        {{ gym.name }}
      </v-btn>
    </div>
    <h1 class="text-center mt-5">
      <v-avatar
        v-if="gym.logoUrl"
        class="mr-1"
      >
        <v-img :src="gym.logoUrl" />
      </v-avatar>
      {{ gym.name }} - {{ $t('components.gymRanking.rank') }}
    </h1>
    <div class="text-center mb-15">
      <p
        v-if="startDate === null"
        class="subtitle-2"
      >
        {{ $t('components.gymRanking.allRank') }}
      </p>
      <p
        v-if="startDate !== null"
        class="subtitle-2"
      >
        {{ $t('components.gymRanking.rankOf', { date: startDate.format('MMMM') }) }}
      </p>
      <v-btn
        v-if="startDate !== null"
        outlined
        text
        small
        color="primary"
        @click="changeDate('previous')"
      >
        <v-icon left>
          {{ mdiArrowLeft }}
        </v-icon>
        {{ previousMonth.format('MMMM') }}
      </v-btn>
      <v-btn
        v-if="startDate === null"
        outlined
        text
        small
        color="primary"
        @click="changeDate('current')"
      >
        {{ $t('components.gymRanking.seeRankOf', { date: $moment().locale($vuetify.lang.current).format('MMMM') }) }}
      </v-btn>
      <v-btn
        v-if="startDate !== null"
        outlined
        text
        small
        color="primary"
        @click="changeDate('all')"
      >
        {{ $t('common.all') }}
      </v-btn>
      <v-btn
        v-if="startDate !== null && haveNextMonth"
        outlined
        text
        small
        color="primary"
        @click="changeDate('next')"
      >
        {{ nextMonth.format('MMMM') }}
        <v-icon right>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </div>

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

    <v-row v-else>
      <!-- First -->
      <v-col
        cols="6"
        md="4"
        align-self="end"
        order="1"
        order-md="2"
      >
        <div
          v-if="!loadingScore && podiums.length >= 1"
          class="text-center"
        >
          <v-avatar>
            <v-img
              :src="podiums[0].user.thumbnailAvatarUrl"
              :alt="`avatar ${podiums[0].user.first_name}`"
            />
          </v-avatar>
          <h3>{{ podiums[0].user.first_name }}</h3>
          <p style="font-size: 1.2em">
            <span class="amber--text">
              {{ $tc('components.gymRanking.rankNumber', 1, { number: 1 }) }}
            </span> ·
            <strong>{{ podiums[0].points }}</strong>
            <small class="vertical-align-top">pts</small>
          </p>
        </div>
        <v-sheet
          class="text-center rounded pa-4 d-flex"
          style="height: 150px"
        >
          <div class="align-self-end text-center full-width">
            <v-icon color="amber" x-large>
              {{ mdiTrophy }}
            </v-icon>
          </div>
        </v-sheet>
      </v-col>

      <!-- Second -->
      <v-col
        cols="6"
        md="4"
        align-self="end"
        order="2"
        order-md="1"
      >
        <div
          v-if="!loadingScore && podiums.length >= 2"
          class="text-center"
        >
          <v-avatar>
            <v-img
              :src="podiums[1].user.thumbnailAvatarUrl"
              :alt="`avatar ${podiums[1].user.first_name}`"
            />
          </v-avatar>
          <h3>
            {{ podiums[1].user.first_name }}
          </h3>
          <p style="font-size: 1.2em">
            <span class="blue-grey--text">
              {{ $tc('components.gymRanking.rankNumber', 2, { number: 2 }) }}
            </span> ·
            <strong>{{ podiums[1].points }}</strong>
            <small class="vertical-align-top">pts</small>
          </p>
        </div>
        <v-sheet
          class="rounded text-center pa-4 d-flex"
          style="height: 100px"
        >
          <div class="align-self-end text-center full-width">
            <v-icon color="blue-grey" x-large>
              {{ mdiTrophy }}
            </v-icon>
          </div>
        </v-sheet>
      </v-col>

      <!-- Third -->
      <v-col
        cols="12"
        md="4"
        align-self="end"
        order="3"
      >
        <div
          v-if="!loadingScore && podiums.length >= 3"
          class="text-center"
        >
          <v-avatar>
            <v-img
              :src="podiums[2].user.thumbnailAvatarUrl"
              :alt="`avatar ${podiums[2].user.first_name}`"
            />
          </v-avatar>
          <h3>{{ podiums[2].user.first_name }}</h3>
          <p style="font-size: 1.2em">
            <span class="brown--text">
              {{ $tc('components.gymRanking.rankNumber', 3, { number: 3 }) }}
            </span> ·
            <strong>{{ podiums[2].points }}</strong>
            <small class="vertical-align-top">pts</small>
          </p>
        </div>
        <v-sheet
          class="rounded pa-4 text-center d-flex"
          style="height: 70px"
        >
          <div class="align-self-end text-center full-width">
            <v-icon color="brown" x-large>
              {{ mdiTrophy }}
            </v-icon>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Other -->
    <v-list
      v-if="!loadingScore && scores.length >= 1"
      class="rounded mt-5"
    >
      <v-list-item
        v-for="(score, scoreIndex) in scores"
        :key="`score-index-${scoreIndex}`"
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
  </v-container>
</template>

<script>
import { mdiTrophy, mdiArrowLeft, mdiArrowRight } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import GymApi from '~/services/oblyk-api/GymApi'
import User from '~/models/User'

export default {
  meta: { orphanRoute: true },
  mixins: [GymConcern],

  data () {
    return {
      loadingScore: true,
      scores: [],
      podiums: [],
      startDate: null,
      endDate: null,
      haveNextMonth: false,
      nextMonth: null,
      previousMonth: null,

      mdiTrophy,
      mdiArrowLeft,
      mdiArrowRight
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

  mounted () {
    this.getRank()
  },

  methods: {
    changeDate (type) {
      this.$moment.locale(this.$vuetify.lang.current)
      if (type === 'previous' || type === 'next') {
        this.startDate ||= this.$moment().startOf('month')
        this.endDate ||= this.$moment().endOf('month')
      }
      if (type === 'all') {
        this.startDate = null
        this.endDate = null
      } else if (type === 'current') {
        this.startDate = this.$moment().startOf('months')
        this.endDate = this.$moment().endOf('month')
      } else if (type === 'previous') {
        this.startDate.subtract(1, 'months')
        this.endDate = this.$moment(this.startDate.format('YYYY-MM-DD')).endOf('month')
      } else if (type === 'next') {
        this.startDate.add(1, 'months')
        this.endDate = this.$moment(this.startDate.format('YYYY-MM-DD')).endOf('month')
      }
      if (this.startDate) {
        this.haveNextMonth = this.$moment(this.startDate.format('YYYY-MM-DD')).add(1, 'month').isBefore(this.$moment())
        this.nextMonth = this.$moment(this.startDate.format('YYYY-MM-DD')).add(1, 'month')
        this.previousMonth = this.$moment(this.startDate.format('YYYY-MM-DD')).subtract(1, 'month')
      }
      this.getRank()
    },

    getRank () {
      this.scores = []
      this.podiums = []
      this.loadingScore = true
      let params = null
      if (this.startDate) {
        params = { start_date: this.startDate.format('YYYY-MM-DD'), end_date: this.endDate.format('YYYY-MM-DD') }
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
    }
  }
}
</script>
