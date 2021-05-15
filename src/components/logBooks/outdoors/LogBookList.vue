<template>
  <div>

    <!-- Sort filed -->
    <v-row>
      <v-col>
        <v-select
          :items="sortItems"
          item-text="text"
          item-value="value"
          v-model="order"
          :label="$t('components.logBook.sortByLabel')"
          outlined
        />
      </v-col>
      <v-col>
        <v-select
          :items="climbingItems"
          item-text="text"
          item-value="value"
          v-model="climbingType"
          :label="$t('components.logBook.filterByClimbingType')"
          outlined
        />
      </v-col>
    </v-row>

    <!-- Send list -->
    <div v-if="!loadingAscendedCragRoutes">
      <crag-route-small-line
        v-for="(cragRoute, index) in cragRoutes"
        :key="`crag-route-ascent-${index}`"
        :route="cragRoute"
      />

      <loading-more :get-function="ascendedCragRoutes" />
    </div>

    <!-- Loading ascended crag -->
    <spinner v-if="loadingAscendedCragRoutes" :full-height="false" />
  </div>
</template>

<script>
import CragRouteSmallLine from '@/components/cragRoutes/CragRouteSmallLine'
import LogBookOutdoorApi from '@/services/oblyk-api/LogBookOutdoorApi'
import CragRoute from '@/models/CragRoute'
import Spinner from '@/components/layouts/Spiner'
import LoadingMore from '@/components/layouts/LoadingMore'
import UserApi from '@/services/oblyk-api/UserApi'
export default {
  name: 'LogBookList',
  components: { LoadingMore, Spinner, CragRouteSmallLine },

  props: {
    user: Object
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
    order: function () {
      this.resetAscents()
      this.ascendedCragRoutes()
    },

    climbingType: function () {
      this.resetAscents()
      this.ascendedCragRoutes()
    }
  },

  mounted () {
    this.ascendedCragRoutes()
  },

  methods: {
    resetAscents: function () {
      this.$root.$emit('setLoadMorePageNumber', 1)
      this.cragRoutes = []
    },

    ascendedCragRoutes: function (page) {
      let promise
      if (this.user) {
        promise = UserApi.ascendedCragRoutes(
          this.user.uuid,
          this.order,
          this.climbingType,
          page
        )
      } else {
        promise = LogBookOutdoorApi.ascendedCragRoutes(
          this.order,
          this.climbingType,
          page
        )
      }

      promise
        .then(resp => {
          for (const route of resp.data) {
            this.cragRoutes.push(new CragRoute(route))
          }
          if (resp.data.length < 25) this.$root.$emit('nothingMoreToLoad')
        })
        .catch(() => {
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingAscendedCragRoutes = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>
