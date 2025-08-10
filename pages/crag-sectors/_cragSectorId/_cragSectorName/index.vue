<template>
  <div>
    <crag-sector-head :crag-sector="cragSector" />
    <crag-sector-description :crag-sector="cragSector" />
    <client-only>
      <crag-routes
        class="mt-4 mb-10"
        :crag-sector="cragSector"
        :card-elevation="0"
      />
      <crag-route-drawer />
    </client-only>
  </div>
</template>

<script>
import CragSectorDescription from '~/components/cragSectors/CragSectorDescription'
import CragSectorHead from '~/components/cragSectors/layout/CragSectorHead'
const CragRoutes = () => import('~/components/cragRoutes/CragRoutes')
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    CragSectorHead,
    CragRouteDrawer,
    CragRoutes,
    CragSectorDescription
  },
  scrollToTop: true,
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  }
}
</script>
