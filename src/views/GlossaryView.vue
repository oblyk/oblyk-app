<template>
  <div>
    <spinner v-if="loadingGlossary"/>

    <v-container v-if="!loadingGlossary" class="glossary-width">
      <v-row>
        <v-col>
          <h1>
            {{ $t('components.word.title') }}
          </h1>
          <v-text-field
            :label="$t('components.word.searchDefinition')"
            outlined
            hide-details
            @keyup="filteredWords()"
            v-model="searchWord"
          />
          <div class="text-right">
            <v-btn
              v-if="isLoggedIn"
              text
              small
              color="primary"
              to="/words/new"
            >
              {{ $t('components.word.addNew') }}
            </v-btn>
          </div>
          <div v-for="(word, index) in words" :key="word.id">
            <p
              v-if="index === 0 || (glossary[index - 1].name.charAt(0).toUpperCase() !== word.name.charAt(0).toUpperCase())"
            >
              <v-alert
                dense
                text
                class="d-inline-block mb-0 mt-3"
              >
                {{ word.name.charAt(0).toUpperCase() }}
              </v-alert>
            </p>

            <word-card
              :word="word"
              class="mb-4"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import ApiWord from '@/services/oblyk-api/wordApi'
import Word from '@/models/Word'
import WordCard from '@/components/words/WordCard'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GlossaryView',
  mixins: [SessionConcern],
  components: { WordCard, Spinner },

  data () {
    return {
      glossary: [],
      loadingGlossary: true,
      searchWord: '',
      words: []
    }
  },

  created () {
    this.getGlossary()
  },

  methods: {
    getGlossary: function () {
      ApiWord
        .all()
        .then(resp => {
          const words = []
          for (const word of resp.data) {
            words.push(new Word(word))
          }
          this.glossary = words
          this.filteredWords()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'word')
        })
        .finally(() => {
          this.loadingGlossary = false
        })
    },

    filteredWords: function () {
      if (this.searchWord === null || this.searchWord === '') {
        this.words = this.glossary
      } else {
        const words = []
        for (const word of this.glossary) {
          if (
            word.name.toLowerCase().indexOf(this.searchWord.toLowerCase()) !== -1
          ) {
            words.push(word)
          }
        }
        this.words = words
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
}
</style>
