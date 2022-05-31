<template>
  <div>
    <div v-if="$fetchState.pending">
      <skeleton-loader-head />
    </div>
    <div v-else>
      <crag-head :crag="crag" />
      <crag-tabs :crag="crag" />
      <div class="nested-crag-routes">
        <nuxt-child :key="$route.params.cragId" :crag="crag" />
        <app-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import CragHead from '~/components/crags/layouts/CragHead'
import CragTabs from '~/components/crags/layouts/CragTabs'
import AppFooter from '~/components/layouts/AppFooter'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'

export default {
  components: {
    SkeletonLoaderHead,
    AppFooter,
    CragTabs,
    CragHead
  },
  mixins: [CragConcern]
}
</script>

<style scoped lang="scss">
.nested-crag-routes {
  min-height: calc(100vh - 420px);
}
</style>
