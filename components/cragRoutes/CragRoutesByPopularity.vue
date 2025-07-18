<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiTrendingUp }}
      </v-icon>
      Voie les plus grimpées
    </p>
    <crag-route-small-card
      v-for="(cragRoute, cragRouteIndex) in cragRoutes"
      :key="`crag-route-index-${cragRouteIndex}`"
      :crag-route="cragRoute"
      small
      class="mb-1"
    />
    <loading-more
      :get-function="getCragRoutes"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </div>
</template>
<script>
import { mdiTrendingUp } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'CragRoutesByPopularity',
  components: {
    CragRouteSmallCard,
    LoadingMore
  },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loading: true,
      cragRoutes: [],

      mdiTrendingUp
    }
  },

  mounted () {
    this.getCragRoutes()
  },

  methods: {
    getCragRoutes () {
      new CragRouteApi(this.$axios, this.$auth)
        .all(null, this.page, null, { order: 'popularity' })
        .then((resp) => {
          for (const cragRoute of resp.data) {
            this.cragRoutes.push(new CragRoute({ attributes: cragRoute }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loading = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
