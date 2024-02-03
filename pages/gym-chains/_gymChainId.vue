<template>
  <div>
    <v-container>
      <div v-if="$fetchState.pending">
        <skeleton-loader-head />
      </div>
      <div v-else>
        <div class="rounded">
          <gym-chain-head :gym-chain="gymChain" />
        </div>
        <nuxt-child :gym-chain="gymChain" />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'
import { GymChainConcern } from '~/concerns/GymChainConcern'
import GymChainHead from '~/components/gymChains/layouts/GymChainHead.vue'

export default {
  components: { GymChainHead, SkeletonLoaderHead, AppFooter },
  mixins: [GymChainConcern]
}
</script>
