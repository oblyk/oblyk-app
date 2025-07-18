<template>
  <div>
    <v-sheet class="search-overview-guide-book-container-header border-bottom pa-2">
      <outdoor-search-field
        ref="outdoorSearchField"
        search-type="guideBook"
        :searching="searching"
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
        <div class="d-flex mb-4 overflow-x-auto">
          <v-card
            to="/maps/guide-book-papers?back_to=/outdoor/search/guide-books"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/guide-book-map.jpg"
              alt="Carte des topos"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiMap }}
                </v-icon>
                {{ $t('common.pages.find.guideBooks.map.title') }}
              </p>
            </v-img>
          </v-card>
          <v-card
            to="/guide-book-papers/find?back_to=/outdoor/search/guide-books"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/around-city.jpg"
              alt="Autour d'une ville"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiMapMarkerRadius }}
                </v-icon>
                {{ $t('common.pages.find.crags.aroundCity.title') }}
              </p>
            </v-img>
          </v-card>
          <v-card
            to="/library?back_to=/outdoor/search/guide-books"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/new-guide-book.jpg"
              alt="Nouveaux topo"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiAlertDecagram }}
                </v-icon>
                {{ $t('components.layout.appDrawer.guideBook.news') }}
              </p>
            </v-img>
          </v-card>
        </div>

        <guide-book-papers-by-popularity />
      </div>

      <!-- Search Results -->
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <guide-book-paper-small-card
          v-for="(guideBook, guideBookIndex) in searchResults"
          :key="`guide-book-outdoor-${guideBookIndex}`"
          small
          :guide-book-paper="guideBook"
          class="mb-1"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import { mdiAlertDecagram, mdiMap, mdiMapMarkerRadius, mdiMapSearch } from '@mdi/js'
import OutdoorSearchField from '~/components/outdoor/OutdoorSearchField'
import GuideBookPapersByPopularity from '~/components/guideBookPapers/GuideBookPapersByPopularity'
import GuideBookPaperSmallCard from '~/components/guideBookPapers/GuideBookPaperSmallCard'
import CommonApi from '~/services/oblyk-api/CommonApi'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaper from '~/models/GuideBookPaper'

export default {
  name: 'OutdoorSearchGuideBookOverview',
  components: {
    GuideBookPaperSmallCard,
    GuideBookPapersByPopularity,
    OutdoorSearchField
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      guideBookApi: null,
      guideBooksCount: '...',
      countLoading: true,

      mdiMapSearch,
      mdiMap,
      mdiAlertDecagram,
      mdiMapMarkerRadius
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
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
      }, 500)
    },

    apiSearch () {
      this.guideBookApi = this.guideBookApi || new GuideBookPaperApi(this.$axios, this.$auth)

      this.guideBookApi.cancelSearch()
      this.guideBookApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const guideBookPaper of resp.data) {
            this.searchResults.push(new GuideBookPaper({ attributes: guideBookPaper }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
          }
        })
        .finally(() => {
          this.searching = false
        })
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
