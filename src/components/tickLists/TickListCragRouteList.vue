<template>
  <div>
    <div
      v-for="(cragRoute, index) in cragRoutes"
      :key="`crag-route-${index}`"
    >
      <div
        class="mt-4"
        v-if="index === 0 || cragRoutes[index].crag.id !== cragRoutes[index - 1].crag.id"
      >
        <v-icon left>mdi-terrain</v-icon>
        {{ cragRoute.Crag.name }}
      </div>
      <div>
        <crag-route-small-line :route="cragRoute" />
      </div>
    </div>
  </div>
</template>

<script>
import CragRouteSmallLine from '@/components/cragRoutes/CragRouteSmallLine'

export default {
  name: 'TickListCragRoute',
  components: { CragRouteSmallLine },
  props: {
    cragRoutes: Array
  }
}
</script>
