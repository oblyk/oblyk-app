<template>
  <div>
    <crag-route-small-line
      v-for="cragRoute in cragRoutes"
      :key="cragRoute.id"
      :route="cragRoute"
    />
  </div>
</template>

<script>
import CragRouteSmallLine from '@/components/cragRoutes/CragRouteSmallLine'
export default {
  name: 'LogBookList',
  components: { CragRouteSmallLine },
  props: {
    cragRoutes: Array,
    break: String
  }
}
</script>
