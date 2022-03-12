<template>
  <div>
    <!-- Sort filed -->
    <v-row>
      <v-col>
        <v-select
          v-model="order"
          :items="sortItems"
          item-text="text"
          item-value="value"
          :label="$t('components.logBook.sortByLabel')"
          outlined
        />
      </v-col>
      <v-col>
        <v-select
          v-model="climbingType"
          :items="climbingItems"
          item-text="text"
          item-value="value"
          :label="$t('components.logBook.filterByClimbingType')"
          outlined
        />
      </v-col>
    </v-row>

    <!-- Send list -->
    <div v-if="!loadingAscendedCragRoutes">
      <div
        v-for="(cragRoute, index) in cragRoutes"
        :key="`crag-route-ascent-${index}`"
      >
        <!-- Crags separator -->
        <p
          v-if="order === 'crags' && (index === 0 || cragRoutes[index].crag.id !== cragRoutes[index - 1].crag.id)"
          class="mb-0 font-weight-bold"
          :class="index !== 0 ? 'mt-7' : ''"
        >
          {{ cragRoute.crag.name }}
        </p>

        <!-- Difficulty separator -->
        <p
          v-if="order === 'difficulty' && (index === 0 || cragRoutes[index].grade_gap.max_grade_value !== cragRoutes[index - 1].grade_gap.max_grade_value)"
          class="mb-0 font-weight-bold"
          :class="index !== 0 ? 'mt-7' : ''"
        >
          {{ gradeValueToText(cragRoute.grade_gap.max_grade_value) }}
        </p>

        <crag-route-small-line :route="cragRoute" />
      </div>

      <loading-more
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        :get-function="ascendedCragRoutes"
      />
    </div>

    <!-- Loading ascended crag -->
    <spinner v-if="loadingAscendedCragRoutes" :full-height="false" />
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import CragRouteSmallLine from '@/components/cragRoutes/CragRouteSmallLine'
import LogBookOutdoorApi from '~/services/oblyk-api/LogBookOutdoorApi'
import CragRoute from '@/models/CragRoute'
import Spinner from '@/components/layouts/Spiner'
import LoadingMore from '@/components/layouts/LoadingMore'
import UserApi from '~/services/oblyk-api/UserApi'
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'LogBookList',
  components: { LoadingMore, Spinner, CragRouteSmallLine },
  mixins: [LoadingMoreHelpers, GradeMixin],

  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingAscendedCragRoutes: true,
      cragRoutes: [],

      order: 'difficulty',
      sortItems: [
        { text: this.$t('components.logBook.sortItem.difficulty'), value: 'difficulty' },
        { text: this.$t('components.logBook.sortItem.crags'), value: 'crags' },
        { text: this.$t('components.logBook.sortItem.released_at'), value: 'released_at' }
      ],

      climbingType: 'all',
      climbingItems: [
        { text: this.$t('components.logBook.climbingItems.all'), value: 'all' },
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.multi_pitch'), value: 'multi_pitch' },
        { text: this.$t('models.climbs.trad_climbing'), value: 'trad_climbing' },
        { text: this.$t('models.climbs.aid_climbing'), value: 'aid_climbing' },
        { text: this.$t('models.climbs.deep_water'), value: 'deep_water' },
        { text: this.$t('models.climbs.via_ferrata'), value: 'via_ferrata' }
      ]
    }
  },

  watch: {
    order () {
      localStorage.setItem('ascentListOrder', this.order)
      this.resetAscents()
      this.ascendedCragRoutes()
    },

    climbingType () {
      this.resetAscents()
      this.ascendedCragRoutes()
    }
  },

  mounted () {
    this.order = localStorage.getItem('ascentListOrder') || 'difficulty'
    this.ascendedCragRoutes()
  },

  methods: {
    resetAscents () {
      this.resetLoadMorePageNumber()
      this.cragRoutes = []
    },

    ascendedCragRoutes () {
      let promise
      if (this.user) {
        promise = new UserApi(this.$axios, this.$auth).ascendedCragRoutes(
          this.user.uuid,
          this.order,
          this.climbingType,
          this.page
        )
      } else {
        promise = new LogBookOutdoorApi(this.$axios, this.$auth).ascendedCragRoutes(
          this.order,
          this.climbingType,
          this.page
        )
      }

      this.moreIsBeingLoaded()
      promise
        .then((resp) => {
          for (const route of resp.data) {
            this.cragRoutes.push(new CragRoute({ attributes: route }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingAscendedCragRoutes = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
