<template>
  <div>

    <!-- Sort filed -->
    <v-select
      :items="sortItems"
      item-text="text"
      item-value="value"
      v-model="order"
      :label="$t('components.logBook.sortByLabel')"
      outlined
    />

    <!-- Send list -->
    <div v-if="!loadingAscendedCragRoutes">
      <crag-route-small-line
        v-for="cragRoute in cragRoutes"
        :key="cragRoute.id"
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
export default {
  name: 'LogBookList',
  components: { LoadingMore, Spinner, CragRouteSmallLine },

  data () {
    return {
      loadingAscendedCragRoutes: true,
      cragRoutes: [],

      order: 'difficulty',

      sortItems: [
        { text: this.$t('components.logBook.sortItem.difficulty'), value: 'difficulty' },
        { text: this.$t('components.logBook.sortItem.crags'), value: 'crags' },
        { text: this.$t('components.logBook.sortItem.released_at'), value: 'released_at' }
      ]
    }
  },

  watch: {
    order: function () {
      this.cragRoutes = []
      this.ascendedCragRoutes()
    }
  },

  mounted () {
    this.ascendedCragRoutes()
  },

  methods: {
    ascendedCragRoutes: function (page) {
      LogBookOutdoorApi
        .ascendedCragRoutes(
          this.order,
          page
        )
        .then(resp => {
          for (const route of resp.data) {
            this.cragRoutes.push(new CragRoute(route))
          }
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingAscendedCragRoutes = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>
