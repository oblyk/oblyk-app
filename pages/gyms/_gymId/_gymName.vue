<template>
  <div>
    <v-container>
      <div v-if="$fetchState.pending">
        <skeleton-loader-head />
      </div>
      <div v-else>
        <div class="rounded-lg elevation-2">
          <gym-head :gym="gym" />
          <gym-tabs :gym="gym" />
        </div>
        <nuxt-child :gym="gym" />
      </div>
    </v-container>
    <app-footer />
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
