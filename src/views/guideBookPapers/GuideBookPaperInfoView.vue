<template>
  <v-container fluid>
    <v-row>
      <v-col class="pa-2 col-12 col-md-6 col-lg-4" order-md="first">
        <guide-book-paper-description :guide-book-paper="guideBookPaper" />
      </v-col>
      <v-col class="pa-2 col-12 col-md-6 col-lg-4" order="first" order-sm="first" order-lg="last">
        <guide-book-paper-cover :guide-book-paper="guideBookPaper" />
      </v-col>
      <v-col class="pa-2 col-12 col-md-12 col-lg-4 d-flex flex-column">
        <div class="flex-grow-1">
          <guide-book-paper-buy :guide-book-paper="guideBookPaper" />
        </div>
        <div v-if="guideBookPaper.haveArticles" class="pt-4 flex-grow-1">
          <guide-book-paper-articles :guide-book-paper="guideBookPaper" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuideBookPaperDescription from '@/components/guideBookPapers/GuideBookPaperDescription'
import GuideBookPaperCover from '@/components/guideBookPapers/GuideBookPaperCover'
import GuideBookPaperBuy from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'
import GuideBookPaperArticles from '@/components/guideBookPapers/GuideBookPaperArticles'

export default {
  name: 'GuideBookPaperInfoView',
  components: {
    GuideBookPaperArticles,
    GuideBookPaperBuy,
    GuideBookPaperCover,
    GuideBookPaperDescription
  },
  props: {
    guideBookPaper: Object
  }
}
</script>
