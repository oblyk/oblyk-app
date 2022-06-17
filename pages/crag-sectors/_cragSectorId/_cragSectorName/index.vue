<template>
  <div>
    <v-container>
      <crag-sector-description :crag-sector="cragSector" />
      <client-only>
        <crag-routes
          class="mt-4 mb-10"
          :crag-sector="cragSector"
          :card-elevation="0"
        />
        <crag-route-drawer />
      </client-only>
    </v-container>
  </div>
</template>

<script>
import CragSectorDescription from '~/components/cragSectors/CragSectorDescription'
const CragRoutes = () => import('~/components/cragRoutes/CragRoutes')
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    CragRouteDrawer,
    CragRoutes,
    CragSectorDescription
  },
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  }
}
</script>
