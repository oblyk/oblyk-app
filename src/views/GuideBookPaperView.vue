<template>
  <div v-if="guideBookPaper">
    <guide-book-paper-tabs :guide-book-paper="guideBookPaper" />
    <router-view :guide-book-paper="guideBookPaper" />
  </div>
</template>
<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import GuideBookPaperTabs from '@/components/guideBookPapers/layouts/GuideBookPaperTabs'

export default {
  name: 'GuideBookPaperView',
  components: { GuideBookPaperTabs },
  mixins: [GuideBookPaperConcern]
}
</script>
