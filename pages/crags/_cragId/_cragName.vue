<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <crag-page-header :crag="crag" />
      <v-container class="crag-container">
        <nuxt-child :key="$route.params.cragId" :crag="crag" />
      </v-container>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import AppFooter from '~/components/layouts/AppFooter'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import CragPageHeader from '~/components/crags/layouts/CragPageHeader'

export default {
  components: {
    CragPageHeader,
    SkeletonLoaderPageHead,
    AppFooter
  },
  mixins: [CragConcern]
}
</script>

<style scoped lang="scss">
.crag-container {
  max-width: 1100px;
  min-height: calc(100vh - 420px);
}
</style>
