<template>
  <div>
    <v-container class="area-container">
      <div v-if="$fetchState.pending">
        <skeleton-loader-head />
      </div>
      <div v-else>
        <div class="rounded-lg elevation-2">
          <area-head :area="area" />
          <area-tabs :area="area" />
        </div>
        <div class="nested-area-routes">
          <nuxt-child :area="area" />
        </div>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AreaHead from '@/components/areas/layouts/AreaHead'
import AreaTabs from '@/components/areas/layouts/AreaTabs'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'
import AppFooter from '~/components/layouts/AppFooter'

export default {
  components: { AppFooter, SkeletonLoaderHead, AreaTabs, AreaHead },
  mixins: [AreaConcern]
}
</script>

<style scoped lang="scss">
.nested-area-routes {
  min-height: calc(100vh - 420px);
}
.area-container {
  max-width: 1100px;
}
</style>
