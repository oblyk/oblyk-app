<template>
  <div v-if="guideBookPaper">
    <guide-book-paper-tabs :guide-book-paper="guideBookPaper" />
    <nuxt-child :key="$route.params.guideBookPaperId" :guide-book-paper="guideBookPaper" />
    <app-footer />
  </div>
</template>

<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import GuideBookPaperTabs from '@/components/guideBookPapers/layouts/GuideBookPaperTabs'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, GuideBookPaperTabs },
  mixins: [GuideBookPaperConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
