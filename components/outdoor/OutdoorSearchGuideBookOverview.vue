<template>
  <div>
    <v-sheet class="search-overview-guide-book-container-header border-bottom pa-2">
      <outdoor-search-field
        ref="outdoorSearchField"
        search-type="guideBook"
        class="mx-auto"
        @input="search"
      />
    </v-sheet>
    <v-container class="outdoor-search-container" style="max-width: 600px; padding-top: 0">
      <div
        v-show="!haveQuery"
        class="mt-n1 pr-1"
      >
        <div class="text-right">
          <small
            class="text--disabled"
            v-html="$tc('components.search.count.guideBookPaper', guideBooksCount, { count: guideBooksCount.toLocaleString() })"
          />
        </div>

        <!-- FIND IN ANOTHER WAY -->
        <p class="mb-1 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiMapSearch }}
          </v-icon>
          {{ $t('common.findAnotherWay') }}
        </p>
        <v-row class="v-row-gutters-12 mb-4">
          <v-col cols="6" md="4">
            <v-card to="/maps/guide-book-papers?back_to=/outdoor/search/guide-books">
              <v-img
                src="/images/guide-book-map.jpg"
                alt="Carte des topos"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('common.pages.find.guideBooks.map.title') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card to="/guide-book-papers/find?back_to=/outdoor/search/guide-books">
              <v-img
                src="/images/around-city.jpg"
                alt="Autour d'une ville"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('common.pages.find.crags.aroundCity.title') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="6" md="4">
            <v-card to="/library?back_to=/outdoor/search/guide-books">
              <v-img
                src="/images/new-guide-book.jpg"
                alt="Nouveaux topo"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('components.layout.appDrawer.guideBook.news') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
        </v-row>

        <guide-book-papers-by-popularity />
      </div>

      <!-- Search Results -->
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <p
          v-if="resultsMeta"
          class="mt-n3 mb-2 font-weight-medium"
        >
          <small>
            {{ $tc('common.resultsCount', resultsMeta.total_count, { count: resultsMeta.total_count.toLocaleString() }) }}
          </small>
        </p>
        <guide-book-paper-small-card
          v-for="(guideBook, guideBookIndex) in searchResults"
          :key="`guide-book-outdoor-${guideBookIndex}`"
          small
          :guide-book-paper="guideBook"
          class="mb-1"
        />
        <loading-more
          :get-function="nextPage"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          skeleton-type="list-item-avatar"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiMap, mdiMapSearch } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OutdoorSearchField from '~/components/outdoor/OutdoorSearchField'
import GuideBookPapersByPopularity from '~/components/guideBookPapers/GuideBookPapersByPopularity'
import GuideBookPaperSmallCard from '~/components/guideBookPapers/GuideBookPaperSmallCard'
import CommonApi from '~/services/oblyk-api/CommonApi'
import OblykApi from '~/services/oblyk-api/OblykApi'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  name: 'OutdoorSearchGuideBookOverview',
  components: {
    LoadingMore,
    GuideBookPaperSmallCard,
    GuideBookPapersByPopularity,
    OutdoorSearchField
  },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      resultsMeta: null,
      previousQuery: null,
      guideBookApi: null,
      guideBooksCount: '...',
      countLoading: true,

      mdiMapSearch,
      mdiMap
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
    },

    cleanQuery () {
      return this.query?.trim()
    }
  },

  mounted () {
    this.getCounts()
  },

  methods: {
    giveFocus () {
      this.$refs.outdoorSearchField.giveFocus()
    },

    getCounts () {
      new CommonApi(this.$axios, this.$auth)
        .microStats(['guide_book_papers_count'])
        .then((resp) => {
          this.guideBooksCount = resp.data.guide_book_papers_count
        })
    },

    search (query) {
      this.query = query
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
      }, 300)
    },

    apiSearch (page = 1, reset = true) {
      this.moreIsBeingLoaded()
      this.oblykApi = this.oblykApi || new OblykApi(this.$axios, this.$auth)
      this.oblykApi.cancelApiRequest()
      this.oblykApi
        .get(
          '/public/guide_book_papers/search',
          { query: this.cleanQuery, page },
          { cancelable: true }
        )
        .then((resp) => {
          if (reset) {
            this.resetLoadMorePageNumber()
            this.searchResults = []
          }
          this.resultsMeta = resp.meta
          for (const guideBookPaper of resp.data) {
            this.searchResults.push(guideBookPaper)
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
    }
  }
}
</script>

<style lang="scss">
.search-overview-guide-book-container-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
@media only screen and (max-width: 959px) {
  .search-overview-guide-book-container-header {
    top: 64px;
  }
}
</style>
