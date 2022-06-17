<template>
  <div>
    <v-container class="glossary-width">
      <v-row>
        <v-col>
          <div v-if="$fetchState.pending">
            <v-skeleton-loader
              class="mx-auto"
              type="article"
            />
          </div>
          <div v-else>
            <word-card
              :presentation="false"
              :word="word"
            />
            <v-btn
              :to="word.glossaryPath"
              text
              class="mt-2"
              color="primary"
            >
              <v-icon left>
                {{ mdiArrowLeft }}
              </v-icon>
              {{ $t('components.word.backToGlossary') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { WordConcern } from '~/concerns/WordConcern'
import WordCard from '~/components/words/WordCard'
import AppFooter from '~/components/layouts/AppFooter'

export default {
  components: { AppFooter, WordCard },
  mixins: [WordConcern],

  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>

<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
  min-height: calc(100vh - 420px);
}
</style>
