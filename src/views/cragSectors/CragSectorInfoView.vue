<template>
  <div>
    <v-container>
      <crag-sector-description :crag-sector="cragSector" />
    </v-container>
    <crag-route-drawer />
  </div>
</template>

<script>
import CragSectorDescription from '@/components/cragSectors/CragSectorDescription'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'

export default {
  name: 'CragSectorInfoView',
  components: { CragRouteDrawer, CragSectorDescription },
  props: {
    cragSector: Object
  }
}
</script>
