<template>
  <div>
    <div v-if="$fetchState.pending">
      <skeleton-loader-head />
    </div>
    <div v-else>
      <area-head :area="area" />
      <area-tabs :area="area" />
      <nuxt-child :area="area" />
    </div>
  </div>
</template>

<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AreaHead from '@/components/areas/layouts/AreaHead'
import AreaTabs from '@/components/areas/layouts/AreaTabs'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'

export default {
  components: { SkeletonLoaderHead, AreaTabs, AreaHead },
  mixins: [AreaConcern]
}
</script>
