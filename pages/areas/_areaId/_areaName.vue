<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <area-page-header :area="area" />
      <v-container class="area-container">
        <nuxt-child :key="$route.params.areaId" :area="area" />
      </v-container>
      <app-footer />
    </div>
  </div>
</template>
<script>
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import { AreaConcern } from '~/concerns/AreaConcern'
import AreaPageHeader from '~/components/areas/layouts/AreaPageHeader'
import AppFooter from '~/components/layouts/AppFooter.vue'

export default {
  components: { AppFooter, AreaPageHeader, SkeletonLoaderPageHead },
  mixins: [AreaConcern]
}
</script>
