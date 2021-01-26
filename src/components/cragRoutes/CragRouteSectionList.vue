<template>
  <v-list
    subheader
    two-line
  >
    <div
      v-for="(section, index) in cragRoute.sections"
      :key="`crag-route-section-${index}`"
    >
      <crag-route-section-item-list
        :crag-route="cragRoute"
        :section="section"
        :index="index"
      />
    </div>
  </v-list>
</template>
<script>
import CragRouteSectionItemList from '@/components/cragRoutes/CragRouteSectionItemList'
export default {
  name: 'CragRouteSectionList',
  components: { CragRouteSectionItemList },
  props: {
    cragRoute: Object
  }
}
</script>
