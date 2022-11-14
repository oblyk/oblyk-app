<template>
  <div>
    <crag-routes :crag="crag" />
    <client-only>
      <crag-route-drawer />
    </client-only>
  </div>
</template>

<script>
import CragRoutes from '~/components/cragRoutes/CragRoutes'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')

export default {
  components: { CragRouteDrawer, CragRoutes },
  props: {
    crag: {
      type: Object,
      required: true
    }
  }
}
</script>
