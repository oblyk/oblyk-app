<template>
  <div>
    <page-header
      :title="word?.name"
      back-to="/glossary"
    />
    <v-container class="glossary-width">
      <v-row>
        <v-col>
          <div v-if="$fetchState.pending">
            <v-skeleton-loader
              class="mx-auto"
              type="article"
            />
          </div>
          <word-card
            v-else
            :presentation="false"
            :word="word"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { WordConcern } from '~/concerns/WordConcern'
import WordCard from '~/components/words/WordCard'
import AppFooter from '~/components/layouts/AppFooter'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, AppFooter, WordCard },
  mixins: [WordConcern]
}
</script>

<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
  min-height: calc(100vh - 420px);
}
</style>
