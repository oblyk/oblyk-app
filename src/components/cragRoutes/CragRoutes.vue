<template>
  <div
    ref="crag-route-area"
    :v-resize="areaResize()"
  >
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            <v-icon left>
              mdi-source-branch
            </v-icon>
            {{ $t('components.cragRoute.routes') }}
          </v-col>
          <v-col
            v-if="isLoggedIn"
            class="add-sector-or-route"
          >
            <add-sector-or-route-btn
              :crag="crag"
              :crag-sector="cragSector"
            />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col>
            <crag-route-search
              v-model="query"
              :crag-sector="cragSector"
              :crag="crag"
            />
          </v-col>
          <v-col>
            <crag-route-sort v-model="routeSort" />
          </v-col>
          <v-col>
            <crag-sector-selector :crag="crag" :crag-sector="cragSector" />
          </v-col>
        </v-row>
      </v-card-subtitle>

      <spinner
        v-if="loadingRoutes"
        :full-height="false"
      />

      <div
        v-if="!loadingRoutes"
      >
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
      </div>
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
import CragSectorSelector from '@/components/cragRoutes/partial/CragSectorSelector'
import CragRouteSort from '@/components/cragRoutes/partial/CragRouteSort'
import CragRouteSearch from '@/components/cragRoutes/partial/CragRouteSearch'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragRoutes',
  components: {
    CragRouteSearch,
    CragRouteSort,
    CragSectorSelector,
    AddSectorOrRouteBtn,
    LoadingMore,
    CragRouteListItem,
    Spinner
  },
  mixins: [SessionConcern],
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
      query: null,
      routeSort: 'difficulty_desc',
      loadingRoutes: true,
      routes: [],
      areaHeight: 0
    }
  },

  watch: {
    routeSort: function () {
      this.reloadRoutes()
    }
  },

  mounted () {
    this.$root.$on('searchCragRoutesResults', (results) => {
      this.haveSearchResults(results)
    })
    this.$root.$on('reloadCragRouteList', () => {
      this.reloadRoutes()
    })
    this.getRoutes()
  },

  methods: {
    areaResize: function () {
      const area = this.$refs['crag-route-area']
      if (area) {
        if (this.areaHeight < area.offsetHeight) {
          area.style.minHeight = `${area.offsetHeight}px`
          this.areaHeight = area.offsetHeight
        }
      }
    },

    haveSearchResults: function (results) {
      this.routes = results
    },

    reloadRoutes: function () {
      this.loadingRoutes = true
      this.routes = []
      this.getRoutes(1)
    },

    getRoutes: function (page) {
      let promise
      if (this.crag) {
        promise = CragRouteApi.allInCrag(this.crag.id, page, this.routeSort)
      } else if (this.cragSector) {
        promise = CragRouteApi.allInCragSector(this.cragSector.id, page, this.routeSort)
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
