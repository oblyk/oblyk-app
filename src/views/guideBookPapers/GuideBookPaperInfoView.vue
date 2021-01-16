<template>
  <v-container>
    <v-row>
      <v-col class="pa-2 col-12 col-md-6 col-lg-4" order-md="first">
        <guide-book-paper-description :guide-book-paper="guideBookPaper" />
      </v-col>
      <v-col class="pa-2 col-12 col-md-6 col-lg-4" order="first" order-sm="first" order-lg="last">
        <guide-book-paper-cover :guide-book-paper="guideBookPaper" />
      </v-col>
      <v-col class="pa-2 col-12 col-md-12 col-lg-4">
        <guide-book-paper-buy :guide-book-paper="guideBookPaper" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuideBookPaperDescription from '@/components/guideBookPapers/GuideBookPaperDescription'
import GuideBookPaperCover from '@/components/guideBookPapers/GuideBookPaperCover'
import GuideBookPaperBuy from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'

export default {
  name: 'GuideBookPaperInfoView',
  components: {
    GuideBookPaperBuy,
    GuideBookPaperCover,
    GuideBookPaperDescription
  },
  props: {
    guideBookPaper: Object
  }
}
</script>
