<template>
  <v-dialog
    v-model="globalSearchDialog"
    fullscreen
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        aria-label="open oblyk search"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
    <v-card :loading="searching">

      <!-- Search filed and chips count result -->
      <v-card-text class="global-search-fields-area pb-0">
        <div class="row ">
          <div class="col pb-1">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              :label="$t('components.search.searchLabel')"
              filled
              rounded
              dense
              ref="globalSearchInput"
              hide-details
              @keyup="search()"
              @click:clear="onSearch = false"
              v-model="query"
            />
          </div>
          <div class="col close-global-search-dialog-btn">
            <v-btn
              icon
              large
              @click="globalSearchDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Chips count result -->
        <div class="global-search-chips">
          <global-search-chip
            icon="mdi-select-group"
            :array-results="areaResults"
            title-key="area"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-terrain"
            :array-results="cragResults"
            title-key="crag"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-home-variant-outline"
            :array-results="gymResults"
            title-key="gym"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-book-open-blank-variant"
            :array-results="guideBookPaperResults"
            title-key="guideBookPaper"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-account-circle-outline"
            :array-results="userResults"
            title-key="user"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-source-branch"
            :array-results="cragRouteResults"
            title-key="cragRoute"
            :callback="scrollTo"
          />
          <global-search-chip
            icon="mdi-format-letter-case"
            :array-results="wordResults"
            title-key="word"
            :callback="scrollTo"
          />
        </div>
      </v-card-text>

      <!-- Result area -->
      <div
        class="global-search-results-area pl-2 pr-2"
        id="global-search-results-area"
      >

        <!-- Area result -->
        <div v-if="areaResults.length > 0">
          <p
            class="global-search-result-title"
            id="area-result-title"
            v-bind:class="showAreaResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showAreaResults = !showAreaResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.area', areaResults.length, { count: areaResults.length } ) }}
          </p>
          <div v-if="showAreaResults">
            <div
              v-for="(area, index) in areaResults"
              :key="`area-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <area-small-card :area="area" />
            </div>
          </div>
        </div>

        <!-- Crag result -->
        <div v-if="cragResults.length > 0">
          <p
            class="global-search-result-title"
            id="crag-result-title"
            v-bind:class="showCragResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showCragResults = !showCragResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.crag', cragResults.length, { count: cragResults.length } ) }}
          </p>
          <div v-if="showCragResults">
            <div
              class="mt-1"
              v-for="(crag, index) in cragResults"
              :key="`crag-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <crag-small-card :small="true" :crag="crag" />
            </div>
          </div>
        </div>

        <!-- Gym result -->
        <div v-if="gymResults.length > 0">
          <p
            class="global-search-result-title"
            id="gym-result-title"
            v-bind:class="showGymResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showGymResults = !showGymResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.gym', gymResults.length, { count: gymResults.length } ) }}
          </p>
          <div v-if="showGymResults">
            <div
              class="mt-1"
              v-for="(gym, index) in gymResults"
              :key="`gym-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <gym-small-card
                :gym="gym"
                :small="true"
              />
            </div>
          </div>
        </div>

        <!-- Guide book papers result -->
        <div v-if="guideBookPaperResults.length > 0">
          <p
            class="global-search-result-title"
            id="guideBookPaper-result-title"
            v-bind:class="showGuideBookPaperResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showGuideBookPaperResults = !showGuideBookPaperResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.guideBookPaper', guideBookPaperResults.length, { count: guideBookPaperResults.length } ) }}
          </p>
          <div v-if="showGuideBookPaperResults">
            <div
              v-for="(guideBookPaper, index) in guideBookPaperResults"
              :key="`guide-book-paper-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <guide-book-paper-small-card :guide-book-paper="guideBookPaper"/>
            </div>
          </div>
        </div>

        <!-- Climbers result -->
        <div v-if="userResults.length > 0">
          <p
            class="global-search-result-title"
            id="user-result-title"
            v-bind:class="showUserResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showUserResults = !showUserResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.user', userResults.length, { count: userResults.length } ) }}
          </p>
          <div v-if="showUserResults">
            <div
              v-for="(user, index) in userResults"
              :key="`climber-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <user-small-card
                :user="user"
                :small="true"
              />
            </div>
          </div>
        </div>

        <!-- Crag route result -->
        <div v-if="cragRouteResults.length > 0">
          <p
            class="global-search-result-title"
            id="cragRoute-result-title"
            v-bind:class="showCragRouteResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showCragRouteResults = !showCragRouteResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.cragRoute', cragRouteResults.length, { count: cragRouteResults.length } ) }}
          </p>
          <div v-if="showCragRouteResults">
            <div
              v-for="(cragRoute, index) in cragRouteResults"
              :key="`crag-route-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <crag-route-small-card
                :crag-route="cragRoute"
                :small="true"
              />
            </div>
          </div>
        </div>

        <!-- Words result -->
        <div v-if="wordResults.length > 0">
          <p
            class="global-search-result-title"
            id="word-result-title"
            v-bind:class="showWordResults ? 'result-is-expanded' : 'result-is-collapse'"
            @click="showWordResults = !showWordResults"
          >
            <v-icon left>mdi-chevron-down</v-icon>
            {{ $tc('components.search.count.word', wordResults.length, { count: wordResults.length } ) }}
          </p>
          <div v-if="showWordResults">
            <div
              v-for="(word, index) in wordResults"
              :key="`word-result-${index}`"
              @click="globalSearchDialog = false"
            >
              <word-card
                :flat="true"
                :small="true"
                :word="word"
              />
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Crag from '@/models/Crag'
import Area from '@/models/Area'
import CragSmallCard from '@/components/crags/CragSmallCard'
import Gym from '@/models/Gym'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import Word from '@/models/Word'
import WordCard from '@/components/words/WordCard'
import SearchApi from '@/services/oblyk-api/SearchApi'
import CragRoute from '@/models/CragRoute'
import GlobalSearchChip from '@/components/searches/GlobalSearchChip'
import CragRouteSmallCard from '@/components/cragRoutes/CragRouteSmallCard'
import AreaSmallCard from '@/components/areas/AreaSmallCard'

export default {
  name: 'GlobalSearchDialog',
  components: {
    AreaSmallCard,
    CragRouteSmallCard,
    GlobalSearchChip,
    WordCard,
    GuideBookPaperSmallCard,
    UserSmallCard,
    GymSmallCard,
    CragSmallCard
  },

  data () {
    return {
      globalSearchDialog: false,
      tab: null,
      query: null,
      searching: false,
      onSearch: false,
      previousQuery: null,

      areaResults: [],
      cragResults: [],
      cragRouteResults: [],
      gymResults: [],
      guideBookPaperResults: [],
      userResults: [],
      wordResults: [],

      showAreaResults: true,
      showCragResults: true,
      showCragRouteResults: true,
      showGymResults: true,
      showGuideBookPaperResults: true,
      showUserResults: true,
      showWordResults: true
    }
  },

  watch: {
    globalSearchDialog: function () {
      if (this.globalSearchDialog === true) {
        setTimeout(() => {
          this.$refs.globalSearchInput.focus()
          this.query = null
        }, 500)
      }
    }
  },

  mounted: function () {
    window.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
        event.preventDefault()
        this.globalSearchDialog = !this.globalSearchDialog
      }
    })
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

    apiSearch: function () {
      SearchApi.cancelSearch()

      SearchApi
        .search(this.query)
        .then(resp => {
          this.clearResults()
          for (const result of resp.data.crags) { this.cragResults.push(new Crag(result)) }
          for (const result of resp.data.gyms) { this.gymResults.push(new Gym(result)) }
          for (const result of resp.data.guide_book_papers) { this.guideBookPaperResults.push(new GuideBookPaper(result)) }
          for (const result of resp.data.users) { this.userResults.push(new User(result)) }
          for (const result of resp.data.crag_routes) { this.cragRouteResults.push(new CragRoute(result)) }
          for (const result of resp.data.words) { this.wordResults.push(new Word(result)) }
          for (const result of resp.data.areas) { this.areaResults.push(new Area(result)) }
          this.previousQuery = this.query
        })
        .finally(() => {
          this.searching = false
        })
    },

    clearResults: function () {
      this.cragResults = []
      this.cragRouteResults = []
      this.gymResults = []
      this.userResults = []
      this.guideBookPaperResults = []
      this.wordResults = []
      this.areaResults = []
    },

    scrollTo: function (target) {
      const targetId = `#${target}-result-title`
      this.$vuetify.goTo(targetId, { container: '#global-search-results-area' })
    }
  }
}
</script>

<style lang="scss" scoped>
.global-search-fields-area {
  height: 108px;
  .global-search-chips {
    white-space: nowrap;
    overflow-y: auto;
  }
}
.global-search-results-area {
  height: calc(100vh - 110px);
  overflow-y: auto;
  .global-search-result-title {
    cursor: pointer;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: rgba(125, 125, 125, 0.2);
    margin: 10px 15px 0;
    .v-icon {
      transition: .3s;
      vertical-align: sub;
    }
    &.result-is-expanded .v-icon { transform: rotate(0deg) }
    &.result-is-collapse .v-icon { transform: rotate(-90deg) }
  }
}
.close-global-search-dialog-btn {
  max-width: 60px;
  .v-btn {
    vertical-align: text-top;
  }
}
</style>
