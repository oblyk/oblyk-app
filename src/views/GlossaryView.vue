<template>
  <div>
    <spinner v-if="loadingGlossary"/>

    <v-container v-if="!loadingGlossary" class="glossary-width">
      <v-row>
        <v-col>
          <h1>
            {{ $t('components.word.title') }}
          </h1>

          <!-- Search -->
          <v-text-field
            :label="$t('components.word.searchDefinition')"
            outlined
            :loading="searching"
            clearable
            hide-details
            @keyup="search()"
            @click:clear="onSearch = false"
            v-model="searchWord"
          />

          <!-- add new word -->
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

          <!-- Glossary list -->
          <div v-if="!onSearch">
            <div v-for="(word, index) in glossary" :key="word.id">
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

            <loading-more :get-function="getGlossary" />
          </div>

          <!-- Search results list -->
          <div v-if="onSearch">
            <div v-for="word in searchResults" :key="`result-${word.id}`">
              <word-card
                :word="word"
                class="mb-4"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import WordApi from '@/services/oblyk-api/WordApi'
import Word from '@/models/Word'
import WordCard from '@/components/words/WordCard'
import { SessionConcern } from '@/concerns/SessionConcern'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  name: 'GlossaryView',
  mixins: [SessionConcern],
  components: { LoadingMore, WordCard, Spinner },

  data () {
    return {
      glossary: [],
      loadingGlossary: true,
      searching: false,
      onSearch: false,
      searchWord: '',
      previousSearchWord: null,
      searchTimeOut: null,
      searchResults: [],
      words: []
    }
  },

  created () {
    this.getGlossary(1)
  },

  methods: {
    getGlossary: function (page) {
      WordApi
        .all(page)
        .then(resp => {
          for (const word of resp.data) {
            this.glossary.push(new Word(word))
          }
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'word')
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingGlossary = false
          this.$root.$emit('moreIsLoaded')
        })
    },

    search () {
      if (this.previousSearchWord === this.searchWord) {
        this.searching = false
        return
      }

      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }
      this.searchTimeOut = setTimeout(() => {
        this.getSearch()
      }, 500)
    },

    getSearch () {
      // Cancel old search
      WordApi.cancelSearch()

      WordApi
        .search(this.searchWord)
        .then(resp => {
          this.searchResults = []
          for (const word of resp.data) {
            this.searchResults.push(new Word(word))
          }
          this.previousSearchWord = this.searchWord
        })
        .catch(err => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'word')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.glossary-width {
  max-width: 700px;
}
</style>
