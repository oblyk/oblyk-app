<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <page-header
        :title="gymChain.name"
        back-to="/indoor"
      />
      <nuxt-child :gym-chain="gymChain" />
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import { GymChainConcern } from '~/concerns/GymChainConcern'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, SkeletonLoaderPageHead, AppFooter },
  mixins: [GymChainConcern]
}
</script>
