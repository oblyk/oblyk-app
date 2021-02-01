<template>
  <div v-if="area">
    <area-head :area="area" />
    <area-tabs :area="area" />
    <router-view :area="area" />
  </div>
</template>
<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AreaHead from '@/components/areas/layouts/AreaHead'
import AreaTabs from '@/components/areas/layouts/AreaTabs'

export default {
  name: 'AreaView',
  components: { AreaTabs, AreaHead },
  mixins: [AreaConcern]
}
</script>
