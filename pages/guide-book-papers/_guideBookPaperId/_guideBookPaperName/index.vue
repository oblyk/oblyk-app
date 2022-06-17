<template>
  <v-container fluid>
    <h1 class="mb-5 mt-3">
      {{ guideBookPaper.name }}
    </h1>
    <v-row>
      <!-- Cover -->
      <v-col class="pa-2 col-12 col-md-6 col-lg-4">
        <guide-book-paper-cover :guide-book-paper="guideBookPaper" />
      </v-col>

      <!-- Information -->
      <v-col class="pa-2 col-12 col-md-6 col-lg-4">
        <guide-book-paper-description :guide-book-paper="guideBookPaper" />
      </v-col>

      <!-- Next version and place of sale -->
      <v-col class="pa-2 col-12 col-md-12 col-lg-4 d-flex flex-column">
        <div class="flex-grow-1">
          <v-card class="full-height">
            <guide-book-paper-next-version
              v-if="guideBookPaper.next_guide_book_paper"
              class="mb-5"
              :guide-book-paper="guideBookPaper.next_guide_book_paper"
            />
            <guide-book-paper-place-of-sale :guide-book-paper="guideBookPaper" />
          </v-card>
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
import GuideBookPaperPlaceOfSale from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'
import GuideBookPaperArticles from '@/components/guideBookPapers/GuideBookPaperArticles'
import GuideBookPaperNextVersion from '@/components/guideBookPapers/GuideBookPaperNextVersion'

export default {
  components: {
    GuideBookPaperNextVersion,
    GuideBookPaperArticles,
    GuideBookPaperPlaceOfSale,
    GuideBookPaperCover,
    GuideBookPaperDescription
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  }
}
</script>
