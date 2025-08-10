<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <crag-sector-page-header :crag-sector="cragSector" />
      <v-container style="min-height: 100vh">
        <nuxt-child :crag-sector="cragSector" />
      </v-container>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { CragSectorConcern } from '~/concerns/CragSectorConcern'
import AppFooter from '~/components/layouts/AppFooter'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import CragSectorPageHeader from '~/components/cragSectors/layout/CragSectorPageHeader'

export default {
  components: {
    CragSectorPageHeader,
    SkeletonLoaderPageHead,
    AppFooter
  },
  mixins: [CragSectorConcern]
}
</script>
