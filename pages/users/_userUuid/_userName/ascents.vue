<template>
  <v-container fluid>
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
    <div v-else>
      <v-card>
        <v-card-text>
          <v-row>
            <!-- Climbing type chart -->
            <v-col class="col-12 col-md-6 col-lg-3">
              <spinner v-if="loadingClimbingTypeChart" :full-height="false" />
              <log-book-climbing-type-chart
                v-if="!loadingClimbingTypeChart"
                :data="climbingTypeData"
                :legend="false"
              />
              <!-- Climbing type legend -->
              <climbing-type-legend class="mt-3" />
            </v-col>

            <!-- Climbing grade chart -->
            <v-col class="col-12 col-md-6 col-lg-4">
              <spinner v-if="loadingGradeChart" :full-height="false" />
              <log-book-grade-chart
                v-if="!loadingGradeChart"
                :data="gradeData"
              />
            </v-col>

            <!-- Global figures -->
            <v-col class="col-12 col-md-12 col-lg-5">
              <spinner v-if="loadingFigures" :full-height="false" />
              <log-book-figures
                v-if="!loadingFigures"
                :figures="figures"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mt-3">
        <v-card-text>
          <log-book-list :user="user" />
        </v-card-text>
      </v-card>
      <client-only>
        <crag-route-drawer />
      </client-only>
    </div>
  </v-container>
</template>

<script>
import { mdiLock } from '@mdi/js'
import LogBookFigures from '@/components/logBooks/outdoors/LogBookFigures'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import LogBookClimbingTypeChart from '@/components/logBooks/outdoors/LogBookClimbingTypeChart'
import LogBookGradeChart from '@/components/logBooks/outdoors/LogBookGradeChart'
import LogBookList from '@/components/logBooks/outdoors/LogBookList'
import ClimbingTypeLegend from '@/components/ui/ClimbingTypeLegend'
import { SessionConcern } from '@/concerns/SessionConcern'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  name: 'UserAscentView',
  components: {
    ClimbingTypeLegend,
    CragRouteDrawer,
    LogBookList,
    LogBookGradeChart,
    LogBookClimbingTypeChart,
    Spinner,
    LogBookFigures
  },
  mixins: [SessionConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiLock,
      loadingFigures: true,
      figures: {},

      loadingClimbingTypeChart: true,
      climbingTypeData: {},

      loadingGradeChart: true,
      gradeData: {}
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
      return this.$t('meta.user.ascent.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription () {
      return this.$t('meta.user.ascent.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path}/ascents`
      }
      return ''
    }
  },

  mounted () {
    if (this.currentUserCanSeeAscents()) {
      this.getFigures()
      this.getClimbingTypeChart()
      this.getGradeChart()
    }
  },

  methods: {
    currentUserCanSeeAscents () {
      // If user have public profil
      if (this.user.public_profile && this.user.public_outdoor_ascents) { return true }

      // If user have public outdoor logbook
      if (this.isLoggedIn && this.user.public_outdoor_ascents) { return true }

      // If current user is subscribe to user
      return (this.isLoggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    },

    getFigures () {
      this.loadingFigures = true
      new UserApi(this.$axios, this.$auth)
        .outdoorFigures(this.user.uuid)
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loadingFigures = false
        })
    },

    getClimbingTypeChart () {
      this.loadingClimbingTypeChart = true
      new UserApi(this.$axios, this.$auth)
        .outdoorClimbTypesChart(this.user.uuid)
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
        .outdoorGradesChart(this.user.uuid)
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeChart = false
        })
    }
  }
}
</script>
