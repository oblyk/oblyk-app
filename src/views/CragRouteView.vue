<template>
  <div
    class="crag-route-card mb-10"
    v-if="cragRoute"
  >
    <v-card>
      <crag-route-head :crag-route="cragRoute" />
      <v-container>
        <crag-route-description :crag-route="cragRoute" />
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <p class="mb-0">
          <v-icon left>
            mdi-check-all
          </v-icon>
          {{ $t('components.cragRoute.inMyLogbook') }}
        </p>
        <crag-route-ascent :crag-route="cragRoute" />
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <crag-route-comments :crag-route="cragRoute" />
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <crag-route-photos lg-col="col-lg-4" :crag-route="cragRoute" />
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <crag-route-videos lg-col="col-lg-4" :crag-route="cragRoute" />
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { CragRouteConcern } from '@/concerns/CragRouteConcern'
import CragRouteHead from '@/components/cragRoutes/layout/CragRouteHead'
import CragRouteDescription from '@/components/cragRoutes/CragRouteDescription'
import CragRouteComments from '@/components/cragRoutes/CragRouteComments'
import CragRoutePhotos from '@/components/cragRoutes/CragRoutePhotos'
import CragRouteVideos from '@/components/cragRoutes/CragRouteVideos'
import CragRouteAscent from '@/components/cragRoutes/CragRouteAscent'

export default {
  name: 'CragRouteView',
  components: {
    CragRouteAscent,
    CragRouteVideos,
    CragRoutePhotos,
    CragRouteComments,
    CragRouteDescription,
    CragRouteHead
  },
  mixins: [CragRouteConcern]
}
</script>

<style lang="scss" scoped>
.crag-route-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  margin-top: 30px;
}
</style>
