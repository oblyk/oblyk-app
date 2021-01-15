<template>
  <div>
    <spinner v-if="loadingWord"/>

    <v-container v-if="!loadingWord" class="glossary-width">
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
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import WordCard from '@/components/words/WordCard'
import { WordConcern } from '@/concerns/WordConcern'

export default {
  name: 'GlossaryView',
  mixins: [WordConcern],
  components: { WordCard, Spinner }
}
</script>
<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
}
</style>
