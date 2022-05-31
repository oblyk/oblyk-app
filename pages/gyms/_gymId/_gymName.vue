<template>
  <div>
    <div v-if="$fetchState.pending">
      <skeleton-loader-head />
    </div>
    <div v-else>
      <gym-head :gym="gym" />
      <gym-tabs :gym="gym" />
      <nuxt-child :gym="gym" />
      <app-footer />
    </div>
  </div>
</template>

<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymTabs from '@/components/gyms/layouts/GymTabs'
import AppFooter from '@/components/layouts/AppFooter'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'

export default {
  components: { SkeletonLoaderHead, AppFooter, GymTabs, GymHead },
  mixins: [GymConcern]
}
</script>
