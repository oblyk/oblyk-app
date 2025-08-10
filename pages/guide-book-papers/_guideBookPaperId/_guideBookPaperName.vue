<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <guide-book-paper-page-header :guide-book-paper="guideBookPaper" />
      <v-container>
        <nuxt-child :key="$route.params.guideBookPaperId" :guide-book-paper="guideBookPaper" />
      </v-container>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import AppFooter from '@/components/layouts/AppFooter'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import GuideBookPaperPageHeader from '~/components/guideBookPapers/layouts/GuideBookPaperPageHeader'

export default {
  components: { GuideBookPaperPageHeader, SkeletonLoaderPageHead, AppFooter },
  mixins: [GuideBookPaperConcern]
}
</script>
