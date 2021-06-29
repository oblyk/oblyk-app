<template>
  <div v-if="crag">
    <crag-head :crag="crag" />
    <crag-tabs :crag="crag" />
    <div class="nested-crag-routes">
      <router-view :key="$route.params.cragId" :crag="crag" />
      <app-footer />
    </div>
  </div>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import CragHead from '@/components/crags/layouts/CragHead'
import CragTabs from '@/components/crags/layouts/CragTabs'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'CragView',
  components: { AppFooter, CragTabs, CragHead },
  mixins: [CragConcern]
}
</script>
<style scoped lang="scss">
.nested-crag-routes {
  min-height: calc(100vh - 420px);
}
</style>
