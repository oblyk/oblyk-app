<template>
  <div v-if="$fetchState.pending">
    <v-row class="mt-3 pl-5 pr-5">
      <v-col cols="12">
        <v-skeleton-loader type="table-thead" :types="{ 'table-thead': 'heading@1' }" />
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-2" />
          <v-skeleton-loader type="image" />
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-8" />
          <v-skeleton-loader type="paragraph, table-cell" />
          <v-skeleton-loader type="actions" />
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-3" />
          <v-skeleton-loader type="list-item-two-line, list-item" class="mb-2" />
          <v-skeleton-loader type="actions" />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
  <div v-else>
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
  mixins: [GuideBookPaperConcern]
}
</script>
