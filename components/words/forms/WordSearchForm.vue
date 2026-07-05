<template>
  <div>
    <v-text-field
      ref="WordSearchForm"
      v-model="query"
      :label="$t('components.word.searchDefinition')"
      outlined
      clearable
      hide-details
      @keyup="search()"
      @click:clear="clearSearch()"
    />

    <div v-if="searchResults.length > 0">
      <p class="mt-1 mb-1">
        {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count }) }}
      </p>
      <word-card
        v-for="(word, wordIndex) in searchResults"
        :key="`crag-index-${wordIndex}`"
        :word="word"
        class="mb-4"
      />
      <loading-more
        :get-function="nextPage"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore'
import WordCard from '~/components/words/WordCard.vue'

export default {
  name: 'WordSearchForm',
  components: { WordCard, LoadingMore },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      resultsMeta: null,
      previousQuery: null,
      oblykApi: null
    }
  },

  computed: {
    cleanQuery () {
      return this.query?.trim()
    }
  },

  methods: {
    search () {
      if (this.previousQuery === this.query) {
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
        this.apiSearch()
      }, 500)
    },

    apiSearch (page = 1, reset = true) {
      this.moreIsBeingLoaded()
      this.oblykApi = this.oblykApi || new OblykApi(this.$axios, this.$auth)
      this.oblykApi.cancelApiRequest()
      this.oblykApi
        .get(
          '/public/words/search',
          { query: this.cleanQuery },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const word of resp.data) {
            this.searchResults.push(word)
          }
          this.previousQuery = this.query
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'crag')
          }
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.searching = false
          this.finallyMoreIsLoaded()
        })
    },

    nextPage () {
      let page = 1
      if (this.resultsMeta) {
        page = this.resultsMeta.next_page
      }
      this.apiSearch(page, false)
    },

    clearSearch () {
      this.searchResults = []
      this.resultsMeta = null
      this.previousQuery = null
      this.query = null
    }
  }
}
</script>
