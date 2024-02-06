<template>
  <div>
    <v-container class="common-page-container">
      <v-skeleton-loader
        v-if="!championship"
        class="mt-2"
        type="card-avatar"
      />
      <div v-else>
        <v-img
          dark
          height="400px"
          max-height="400px"
          gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
          :lazy-src="championship.thumbnailBannerUrl"
          :src="championship.bannerUrl"
          class="rounded"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
          <v-row
            class="fill-height ma-0 py-4"
            align="end"
            justify="center"
          >
            <div class="text-center">
              <h1 class="mb-n1">
                {{ championship.name }}
              </h1>
            </div>
          </v-row>
        </v-img>

        <v-sheet
          v-if="championship.description"
          class="pa-4 rounded mt-4"
        >
          <client-only>
            <markdown-text :text="championship.description" />
          </client-only>
        </v-sheet>

        <championship-result-table
          class="mt-4"
          :championship="championship"
        />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>
<script>
import { ChampionshipConcern } from '~/concerns/ChampionshipConcern'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import ChampionshipResultTable from '~/components/championships/ChampionshipResultTable.vue'
import AppFooter from '~/components/layouts/AppFooter.vue'

export default {
  components: { AppFooter, ChampionshipResultTable, MarkdownText },
  meta: { orphanRoute: true },
  mixins: [ChampionshipConcern],
  layout: 'contest'
}
</script>
