<template>
  <v-card class="full-height">
    <guide-book-paper-place-of-sale :guide-book-paper="guideBookPaper" />
  </v-card>
</template>

<script>
import GuideBookPaperPlaceOfSale from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'

export default {
  components: {
    GuideBookPaperPlaceOfSale
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  }
}
</script>
