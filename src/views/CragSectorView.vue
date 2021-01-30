<template>
  <div class="crag-sector-card" v-if="cragSector">
    <v-card>
      <crag-sector-head :crag-sector="cragSector" />
      <crag-sector-tabs :crag-sector="cragSector" />
      <router-view :crag-sector="cragSector" />
    </v-card>
    <crag-routes
      class="mt-4 mb-10"
      :crag-sector="cragSector"
    />
    <crag-route-drawer />
  </div>
</template>
<script>
import { CragSectorConcern } from '@/concerns/CragSectorConcern'
import CragSectorHead from '@/components/cragSectors/layout/CragSectorHead'
import CragSectorTabs from '@/components/cragSectors/layout/CragSectorTabs'
import CragRoutes from '@/components/cragRoutes/CragRoutes'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'

export default {
  name: 'CragSectorView',
  components: { CragRouteDrawer, CragRoutes, CragSectorTabs, CragSectorHead },
  mixins: [CragSectorConcern]
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
