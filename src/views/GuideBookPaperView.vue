<template>
  <div>
    <div v-if="!loadingGuideBookPaper">
      <guide-book-paper-tabs :guide-book-paper="guideBookPaper" />
      <router-view></router-view>
    </div>
    <spinner v-if="loadingGuideBookPaper" />
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import GuideBookPaperTabs from '@/components/guideBookPapers/layouts/GuideBookPaperTabs'

export default {
  name: 'GuideBookPaperView',
  components: { GuideBookPaperTabs, Spinner },
  mixins: [GuideBookPaperConcern],
  watch: {
    '$route.params.guideBookPaperId': 'getGuideBookPaper'
  }
}
</script>
