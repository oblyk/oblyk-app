<template>
  <div>
    <v-container class="crag-container">
      <div v-if="$fetchState.pending">
        <skeleton-loader-head />
      </div>
      <div v-else>
        <div class="rounded-lg elevation-2">
          <crag-head :crag="crag" />
          <crag-tabs :crag="crag" />
        </div>
        <div class="nested-crag-routes">
          <nuxt-child :key="$route.params.cragId" :crag="crag" />
        </div>
      </div>
    </v-container>
    <app-footer />
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
.crag-container {
  max-width: 1100px;
}
</style>
