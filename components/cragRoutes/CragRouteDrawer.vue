<template>
  <v-navigation-drawer
    v-model="cragRouteDrawer"
    class="crag-route-drawer"
    temporary
    absolute
    right
  >
    <spinner v-if="loadingCragRoute" />
    <div v-if="!loadingCragRoute">
      <crag-route-head
        :crag-route="cragRoute"
      />
      <div class="pr-3 pl-3 pt-1">
        <crag-route-description :crag-route="cragRoute" />
        <client-only>
          <crag-route-ascent
            v-if="isLoggedIn"
            :crag-route="cragRoute"
          />
        </client-only>
        <v-divider class="mt-5 mb-5" />
        <crag-route-comments :crag-route="cragRoute" />
        <v-divider class="mt-5 mb-5" />
        <crag-route-photos :crag-route="cragRoute" lg-col="col-lg-6" />
        <v-divider class="mt-5 mb-5" />
        <crag-route-videos :crag-route="cragRoute" lg-col="col-lg-6" />
        <v-row>
          <v-col cols="12">
            <version-information
              :object="cragRoute"
              object-type="cragRoute"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import CragRouteHead from '@/components/cragRoutes/layout/CragRouteHead'
import CragRouteDescription from '@/components/cragRoutes/CragRouteDescription'
import CragRouteComments from '@/components/cragRoutes/CragRouteComments'
import CragRoutePhotos from '@/components/cragRoutes/CragRoutePhotos'
import CragRouteVideos from '@/components/cragRoutes/CragRouteVideos'
import CragRouteAscent from '@/components/cragRoutes/CragRouteAscent'
import { SessionConcern } from '@/concerns/SessionConcern'
import VersionInformation from '~/components/ui/VersionInformation'

export default {
  name: 'CragRouteDrawer',
  components: {
    VersionInformation,
    CragRouteAscent,
    CragRouteVideos,
    CragRoutePhotos,
    CragRouteComments,
    CragRouteDescription,
    CragRouteHead,
    Spinner
  },
  mixins: [SessionConcern],

  data () {
    return {
      cragRouteDrawer: false,
      loadingCragRoute: true,
      cragRouteId: null,
      cragId: null,
      cragRoute: null
    }
  },

  mounted () {
    this.$root.$on('getCragRouteInDrawer', (cragId, cragRouteId) => {
      this.cragRouteId = cragRouteId
      this.cragId = cragId
      this.getCragRoute()
    })
  },

  beforeDestroy () {
    this.$root.$off('getCragRouteInDrawer')
  },

  methods: {
    getCragRoute () {
      if (!this.$auth.loggedIn) { return false }

      this.cragRouteDrawer = true
      this.loadingCragRoute = true

      new CragRouteApi(this.$axios, this.$auth)
        .find(
          this.cragId,
          this.cragRouteId
        )
        .then((resp) => {
          this.cragRoute = new CragRoute({ attributes: resp.data })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .then(() => {
          this.loadingCragRoute = false
        })
    }
  }
}
</script>

<style lang="scss">
.crag-route-drawer {
  width: 700px !important;
  max-width: calc(100vw - 50px);
  position: fixed;
  height: 100vh !important;
  &.v-navigation-drawer {
    z-index: 300;
  }
}

.theme--light {
  .crag-route-drawer {
    .v-card, .v-data-table {
      background-color: #f5f5f5;
    }
  }
}
</style>
