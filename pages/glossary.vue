<template>
  <div>
    <v-container v-if="loadingGlossary" class="glossary-width">
      <v-skeleton-loader
        class="mx-auto mb-3"
        type="list-item-three-line"
      />
    </v-container>

    <v-container v-if="!loadingGlossary" class="glossary-width">
      <v-row>
        <v-col>
          <h1>
            {{ $t('components.word.title') }}
          </h1>

          <!-- Search -->
          <v-text-field
            v-model="searchWord"
            :label="$t('components.word.searchDefinition')"
            outlined
            :loading="searching"
            clearable
            hide-details
            @keyup="search()"
            @click:clear="onSearch = false"
          />

          <!-- add new word -->
          <div class="text-right">
            <v-btn
              v-if="isLoggedIn"
              text
              small
              color="primary"
              to="/a/words/new"
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

            <loading-more
              :get-function="getGlossary"
              :loading-more="loadingMoreData"
              :no-more-data="noMoreDataToLoad"
              skeleton-type="list-item-three-line"
            />
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
    <app-footer v-if="noMoreDataToLoad" />
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import WordApi from '@/services/oblyk-api/WordApi'
import Word from '@/models/Word'
import WordCard from '@/components/words/WordCard'
import LoadingMore from '@/components/layouts/LoadingMore'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, LoadingMore, WordCard },
  mixins: [SessionConcern, LoadingMoreHelpers],

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
      words: [],
      wordApi: null
    }
  },

  head () {
    return {
      title: this.$t('meta.glossary.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.glossary.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.glossary.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.glossary.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  created () {
    this.getGlossary()
  },

  methods: {
    getGlossary () {
      this.moreIsBeingLoaded()
      new WordApi(this.$axios, this.$auth)
        .all(this.page)
        .then((resp) => {
          for (const word of resp.data) {
            this.glossary.push(new Word({ attributes: word }))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'word')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingGlossary = false
          this.finallyMoreIsLoaded()
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
      this.wordApi = this.wordApi || new WordApi(this.$axios, this.$auth)

      // cancel previous search
      this.wordApi.cancelSearch()

      this.wordApi
        .search(this.searchWord)
        .then((resp) => {
          this.searchResults = []
          for (const word of resp.data) {
            this.searchResults.push(new Word({ attributes: word }))
          }
          this.previousSearchWord = this.searchWord
        })
        .catch((err) => {
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
