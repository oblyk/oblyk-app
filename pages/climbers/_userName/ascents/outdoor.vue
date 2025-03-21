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
      <v-card class="mt-3">
        <v-card-text>
          <v-row>
            <!-- Climbing type chart -->
            <v-col
              cols="12"
              md="6"
              lg="3"
            >
              <spinner v-if="loadingStats" :full-height="false" />
              <log-book-climbing-type-chart
                v-if="!loadingStats"
                :data="stats.climb_types_chart"
                :legend="false"
              />
              <!-- Climbing type legend -->
              <climbing-type-legend class="mt-3" />
            </v-col>

            <!-- Climbing grade chart -->
            <v-col
              cols="12"
              md="6"
              lg="4"
            >
              <spinner v-if="loadingStats" :full-height="false" />
              <log-book-grade-chart
                v-if="!loadingStats"
                :data="stats.grades_chart"
              />
            </v-col>

            <!-- Global figures -->
            <v-col
              cols="12"
              md="12"
              :lg="loadingStats || stats.figures.ascents === 0 ? '12' : '5'"
            >
              <spinner v-if="loadingStats" :full-height="false" />
              <log-book-figures
                v-if="!loadingStats && stats.figures.ascents > 0"
                :figures="stats.figures"
                :user="user"
              />
              <div
                v-if="!loadingStats && stats.figures.ascents === 0"
                class="py-5"
              >
                <p class="text-center mb-0">
                  {{ $t('components.user.emptyLogbook', { name: user.first_name }) }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
        v-if="loadTheRest"
        class="mt-3"
      >
        <v-card-text>
          <log-book-list :user="user" :filters="filters" />
        </v-card-text>
        <client-only>
          <crag-route-drawer />
        </client-only>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiLock } from '@mdi/js'
import { SubscribeConcern } from '~/concerns/SubscribeConcern'
import LogBookFigures from '~/components/logBooks/outdoors/LogBookFigures'
import UserApi from '~/services/oblyk-api/UserApi'
import Spinner from '~/components/layouts/Spiner'
import LogBookClimbingTypeChart from '~/components/logBooks/outdoors/LogBookClimbingTypeChart'
import LogBookGradeChart from '~/components/logBooks/outdoors/LogBookGradeChart'
import LogBookList from '~/components/logBooks/outdoors/LogBookList'
import ClimbingTypeLegend from '~/components/ui/ClimbingTypeLegend'

const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    ClimbingTypeLegend,
    CragRouteDrawer,
    LogBookList,
    LogBookGradeChart,
    LogBookClimbingTypeChart,
    Spinner,
    LogBookFigures
  },
  mixins: [SubscribeConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadTheRest: false,
      loadingStats: true,

      filters: {
        ascentStatusList: ['onsight', 'flash', 'red_point', 'project', 'sent', 'repetition'],
        climbingTypeList: ['sport_climbing', 'bouldering', 'multi_pitch', 'trad_climbing', 'aid_climbing', 'deep_water', 'via_ferrata'],
        ropingStatusList: ['lead_climb', 'top_rope', 'multi_pitch_leader', 'multi_pitch_second', 'multi_pitch_alternate_lead']
      },
      stats: {
        figures: {},
        climb_types_chart: {},
        grades_chart: {}
      },
      statsList: ['figures', 'climb_types_chart', 'grades_chart'],

      mdiLock
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
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.path}/ascents/outdoor`
      }
      return ''
    }
  },

  mounted () {
    if (this.currentUserCanSeeAscents()) {
      this.getStats()
    }
  },

  methods: {
    currentUserCanSeeAscents () {
      // If user have public profil
      if (this.user.public_profile && this.user.public_outdoor_ascents) {
        return true
      }

      // If user have public outdoor logbook
      if (this.$auth.loggedIn && this.user.public_outdoor_ascents) {
        return true
      }

      // If current user is subscribed to user
      return (this.$auth.loggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    },

    getStats () {
      this.loadingStats = true
      new UserApi(this.$axios, this.$auth)
        .stats(
          this.user.uuid,
          this.statsList,
          this.filters
        )
        .then((resp) => {
          this.stats = resp.data
          if (this.stats.figures.ascents > 0) {
            this.loadTheRest = true
          }
        })
        .finally(() => {
          this.loadingStats = false
        })
    }
  }
}
</script>
