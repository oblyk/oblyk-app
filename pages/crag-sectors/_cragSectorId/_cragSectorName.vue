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
      class="crag-sector-card"
    >
      <v-card>
        <crag-sector-head :crag-sector="cragSector" />
        <crag-sector-tabs :crag-sector="cragSector" />
        <nuxt-child :crag-sector="cragSector" />
      </v-card>
      <crag-routes
        class="mt-4 mb-10"
        :crag-sector="cragSector"
      />
      <client-only>
        <crag-route-drawer />
      </client-only>
    </div>
  </div>
</template>
<script>
import { CragSectorConcern } from '~/concerns/CragSectorConcern'
import CragSectorHead from '~/components/cragSectors/layout/CragSectorHead'
import CragSectorTabs from '~/components/cragSectors/layout/CragSectorTabs'
import CragRoutes from '~/components/cragRoutes/CragRoutes'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    CragRouteDrawer,
    CragRoutes,
    CragSectorTabs,
    CragSectorHead
  },
  mixins: [CragSectorConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  margin-top: 30px;
}
</style>
