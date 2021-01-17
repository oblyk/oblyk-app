<template>
  <v-container v-if="guideBookPaper">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h1 class="mb-4">
          {{ $t('components.guideBookPaper.addCragInGuide') }}
        </h1>

        <add-crag-in-guide-book-form
          :guide-book-paper="guideBookPaper"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import AddCragInGuideBookForm from '@/components/guideBookPaperCrags/forms/AddCragInGuideBookForm'

export default {
  name: 'AddCragInGuideBookView',
  components: { AddCragInGuideBookForm },
  mixins: [GuideBookPaperConcern]
}
</script>
