<template>
  <div v-if="guideBookPaper">
    <guide-book-paper-tabs :guide-book-paper="guideBookPaper" />
    <router-view
      :key="$route.params.guideBookPaperId"
      :guide-book-paper="guideBookPaper"
    />
    <app-footer />
  </div>
</template>
<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import GuideBookPaperTabs from '@/components/guideBookPapers/layouts/GuideBookPaperTabs'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GuideBookPaperView',
  components: { AppFooter, GuideBookPaperTabs },
  mixins: [GuideBookPaperConcern]
}
</script>
