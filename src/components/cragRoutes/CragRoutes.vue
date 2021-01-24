<template>
  <div>
    <spinner
      v-if="loadingRoutes"
      :full-height="false"
    />

    <v-card v-if="!loadingRoutes">
      <v-card-title>
        <v-row>
          <v-col>
            <v-icon left>
              mdi-source-branch
            </v-icon>
            {{ $t('components.cragRoute.routes') }}
          </v-col>
          <v-col class="add-sector-or-route">
            <add-sector-or-route-btn
              :crag="crag"
              :crag-sector="cragSector"
            />
          </v-col>
        </v-row>
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
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import Spinner from '@/components/layouts/Spiner'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'
import LoadingMore from '@/components/layouts/LoadingMore'
import AddSectorOrRouteBtn from '@/components/cragRoutes/partial/AddSectorOrRouteBtn'

export default {
  name: 'CragRoutes',
  components: { AddSectorOrRouteBtn, LoadingMore, CragRouteListItem, Spinner },
  props: {
    crag: {
      type: Object
    },
    cragSector: {
      type: Object
    }
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
      let promise
      if (this.crag) {
        promise = CragRouteApi.allInCrag(this.crag.id, page)
      } else if (this.cragSector) {
        promise = CragRouteApi.allInCragSector(this.cragSector.id, page)
      }
      promise
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

<style lang="scss" scoped>
.add-sector-or-route {
  max-width: 120px;
  text-align: right;
}
</style>
