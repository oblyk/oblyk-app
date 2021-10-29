<template>
  <div>
    <v-container
      v-if="word"
      class="glossary-width"
    >
      <v-row>
        <v-col>
          <word-card
            :presentation="false"
            :word="word"
          />
          <v-btn
            :to="word.glossaryPath()"
            text
            class="mt-2"
            color="primary"
          >
            <v-icon left>
              mdi-arrow-left
            </v-icon>
            {{ $t('components.word.backToGlossary') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { WordConcern } from '@/concerns/WordConcern'
import WordCard from '@/components/words/WordCard'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GlossaryView',
  mixins: [WordConcern],
  components: { AppFooter, WordCard }
}
</script>

<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
  min-height: calc(100vh - 420px);
}
</style>
