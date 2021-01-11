<template>
  <div>
    <spinner
      v-if="loadingRoutes"
      :full-height="false"
    />

    <v-card v-if="!loadingRoutes">
      <v-card-title>
        <v-icon left>
          mdi-source-branch
        </v-icon>
        {{ $t('components.cragRoute.routes') }}
      </v-card-title>
      <v-list
        subheader
        two-line
      >
        <div
          v-for="route in routes"
          :key="route.id"
        >
          <crag-route-list-item :route="route" />
        </div>

        <loading-more :get-function="getRoutes" />
      </v-list>

      <!-- If no routes -->
      <v-card-text v-if="routes.length === 0" class="text-center text--disabled pb-10">
        {{ $t('components.crag.noRoutes') }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CragRouteApi from '@/services/oblyk-api/cragRouteApi'
import CragRoute from '@/models/CragRoute'
import Spinner from '@/components/layouts/Spiner'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  name: 'CragRoutes',
  components: { LoadingMore, CragRouteListItem, Spinner },
  props: {
    crag: Object
  },

  data () {
    return {
      loadingRoutes: true,
      routes: []
    }
  },

  mounted () {
    this.getRoutes()
  },

  methods: {
    getRoutes: function (page) {
      CragRouteApi
        .allInCrag(this.crag.id, page)
        .then(resp => {
          for (const route of resp.data) {
            this.routes.push(new CragRoute(route))
          }
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingRoutes = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>
