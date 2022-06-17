<template>
  <div>
    <div v-if="$fetchState.pending">
      <v-container>
        <v-skeleton-loader
          class="mx-auto"
          type="image, table-heading, divider, list-item-three-line, actions"
        />
      </v-container>
    </div>

    <div
      v-else
      class="crag-route-card mb-10"
    >
      <v-card>
        <crag-route-head :crag-route="cragRoute" />
        <v-container>
          <crag-route-description :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Ascents -->
      <v-card
        v-if="isLoggedIn"
        class="mt-5"
      >
        <v-container>
          <p class="mb-0">
            <v-icon left>
              {{ mdiCheckAll }}
            </v-icon>
            {{ $t('components.cragRoute.inMyLogbook') }}
          </p>
          <crag-route-ascent :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Comments -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-comments :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Photos -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-photos lg-col="col-lg-4" :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Videos -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-videos lg-col="col-lg-4" :crag-route="cragRoute" />
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mdiCheckAll } from '@mdi/js'
import { CragRouteConcern } from '~/concerns/CragRouteConcern'
import { SessionConcern } from '~/concerns/SessionConcern'
import CragRouteHead from '~/components/cragRoutes/layout/CragRouteHead'
import CragRouteDescription from '~/components/cragRoutes/CragRouteDescription'
import CragRouteComments from '~/components/cragRoutes/CragRouteComments'
import CragRoutePhotos from '~/components/cragRoutes/CragRoutePhotos'
import CragRouteVideos from '~/components/cragRoutes/CragRouteVideos'
import CragRouteAscent from '~/components/cragRoutes/CragRouteAscent'

export default {
  components: {
    CragRouteAscent,
    CragRouteVideos,
    CragRoutePhotos,
    CragRouteComments,
    CragRouteDescription,
    CragRouteHead
  },
  mixins: [CragRouteConcern, SessionConcern],

  data () {
    return {
      mdiCheckAll
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}
</style>
