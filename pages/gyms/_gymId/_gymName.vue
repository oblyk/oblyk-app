<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <gym-page-header :gym="gym" />
      <nuxt-child :gym="gym" />
    </div>
  </div>
</template>

<script>
import { GymConcern } from '@/concerns/GymConcern'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import GymPageHeader from '~/components/gyms/layouts/GymPageHeader'

export default {
  components: { GymPageHeader, SkeletonLoaderPageHead },
  mixins: [GymConcern]
}
</script>
