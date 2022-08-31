<template>
  <div>
    <v-container v-if="$fetchState.pending">
      <v-row class="mt-3 pl-5 pr-5">
        <v-col cols="12" md="8">
          <v-sheet class="pa-2">
            <v-skeleton-loader type="heading" class="mb-8" />
            <v-skeleton-loader type="paragraph, table-cell" />
            <v-skeleton-loader type="actions" />
          </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
          <v-sheet class="pa-2">
            <v-skeleton-loader type="heading" class="mb-2" />
            <v-skeleton-loader type="image" />
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="table-thead" :types="{ 'table-thead': 'heading@1' }" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <guide-book-paper-head :guide-book-paper="guideBookPaper" />
      <guide-book-paper-tabs :guide-book-paper="guideBookPaper" />
      <nuxt-child :key="$route.params.guideBookPaperId" :guide-book-paper="guideBookPaper" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { GuideBookPaperConcern } from '@/concerns/GuideBookPaperConcern'
import GuideBookPaperTabs from '@/components/guideBookPapers/layouts/GuideBookPaperTabs'
import AppFooter from '@/components/layouts/AppFooter'
import GuideBookPaperHead from '~/components/guideBookPapers/layouts/GuideBookPaperHead'

export default {
  components: { GuideBookPaperHead, AppFooter, GuideBookPaperTabs },
  mixins: [GuideBookPaperConcern]
}
</script>
