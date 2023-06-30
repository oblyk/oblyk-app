<template>
  <v-card :loading="searching">
    <!-- Search filed and chips count result -->
    <v-card-text class="global-search-fields-area pb-0">
      <div class="row">
        <div class="col pb-1">
          <v-text-field
            ref="globalSearchInput"
            v-model="query"
            :prepend-inner-icon="mdiMagnify"
            :label="$t('components.search.searchLabel')"
            filled
            rounded
            dense
            hide-details
            @keyup="search"
            @click:clear="onSearch = false"
          />
        </div>
        <div class="col close-global-search-dialog-btn">
          <v-btn
            icon
            large
            @click="closeDialogue()"
          >
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- Chips count result -->
      <div class="global-search-chips">
        <global-search-chip
          :icon="mdiSelectGroup"
          :array-results="areaResults"
          title-key="area"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiTerrain"
          :array-results="cragResults"
          title-key="crag"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiHomeVariantOutline"
          :array-results="gymResults"
          title-key="gym"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiBookOpenPageVariant"
          :array-results="guideBookPaperResults"
          title-key="guideBookPaper"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiAccountCircleOutline"
          :array-results="userResults"
          title-key="user"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiSourceBranch"
          :array-results="cragRouteResults"
          title-key="cragRoute"
          :callback="scrollTo"
        />
        <global-search-chip
          :icon="mdiFormatLetterCase"
          :array-results="wordResults"
          title-key="word"
          :callback="scrollTo"
        />
      </div>
    </v-card-text>

    <!-- Result area -->
    <div
      id="global-search-results-area"
      class="global-search-results-area pl-2 pr-2"
    >
      <spinner v-if="loadingExternalSearch" />

      <!-- Previous research -->
      <div
        v-if="!loadingExternalSearch && !haveResult && previousSearch().length > 0"
        class="pl-5"
      >
        <p
          v-for="(storedQuery, index) in previousSearch()"
          :key="`previous-query-${index}`"
          class="mb-1"
        >
          <span
            class="hoverable"
            @click="research(storedQuery)"
          >
            <v-icon left>{{ mdiHistory }}</v-icon>
            {{ storedQuery }}
          </span>
        </p>
      </div>

      <!-- Crag result -->
      <div v-if="cragResults.length > 0">
        <p
          id="crag-result-title"
          class="global-search-result-title"
          :class="showCragResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showCragResults = !showCragResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.crag', cragResults.length, { count: cragResults.length } ) }}
        </p>
        <div v-if="showCragResults">
          <div
            v-for="(crag, index) in cragResults"
            :key="`crag-result-${index}`"
            class="mt-1"
            @click="closeAndSaveSearch()"
          >
            <crag-small-card :small="true" :crag="crag" />
          </div>
        </div>
      </div>

      <!-- Area result -->
      <div v-if="areaResults.length > 0">
        <p
          id="area-result-title"
          class="global-search-result-title"
          :class="showAreaResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showAreaResults = !showAreaResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.area', areaResults.length, { count: areaResults.length } ) }}
        </p>
        <div v-if="showAreaResults">
          <div
            v-for="(area, index) in areaResults"
            :key="`area-result-${index}`"
            @click="closeAndSaveSearch()"
          >
            <area-small-card :area="area" />
          </div>
        </div>
      </div>

      <!-- Gym result -->
      <div v-if="gymResults.length > 0">
        <p
          id="gym-result-title"
          class="global-search-result-title"
          :class="showGymResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showGymResults = !showGymResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.gym', gymResults.length, { count: gymResults.length } ) }}
        </p>
        <div v-if="showGymResults">
          <div
            v-for="(gym, index) in gymResults"
            :key="`gym-result-${index}`"
            class="mt-1"
            @click="closeAndSaveSearch()"
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
          id="guideBookPaper-result-title"
          class="global-search-result-title"
          :class="showGuideBookPaperResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showGuideBookPaperResults = !showGuideBookPaperResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.guideBookPaper', guideBookPaperResults.length, { count: guideBookPaperResults.length } ) }}
        </p>
        <div v-if="showGuideBookPaperResults">
          <div
            v-for="(guideBookPaper, index) in guideBookPaperResults"
            :key="`guide-book-paper-result-${index}`"
            @click="closeAndSaveSearch()"
          >
            <guide-book-paper-small-card :guide-book-paper="guideBookPaper" />
          </div>
        </div>
      </div>

      <!-- Climbers result -->
      <div v-if="userResults.length > 0">
        <p
          id="user-result-title"
          class="global-search-result-title"
          :class="showUserResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showUserResults = !showUserResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.user', userResults.length, { count: userResults.length } ) }}
        </p>
        <div v-if="showUserResults">
          <div
            v-for="(user, index) in userResults"
            :key="`climber-result-${index}`"
            @click="closeAndSaveSearch()"
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
          id="cragRoute-result-title"
          class="global-search-result-title"
          :class="showCragRouteResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showCragRouteResults = !showCragRouteResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.cragRoute', cragRouteResults.length, { count: cragRouteResults.length } ) }}
        </p>
        <div v-if="showCragRouteResults">
          <div
            v-for="(cragRoute, index) in cragRouteResults"
            :key="`crag-route-result-${index}`"
            @click="closeAndSaveSearch()"
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
          id="word-result-title"
          class="global-search-result-title"
          :class="showWordResults ? 'result-is-expanded' : 'result-is-collapse'"
          @click="showWordResults = !showWordResults"
        >
          <v-icon left>
            {{ mdiChevronDown }}
          </v-icon>
          {{ $tc('components.search.count.word', wordResults.length, { count: wordResults.length } ) }}
        </p>
        <div v-if="showWordResults">
          <div
            v-for="(word, index) in wordResults"
            :key="`word-result-${index}`"
            @click="closeAndSaveSearch()"
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
</template>

<script>
import {
  mdiChevronDown,
  mdiClose,
  mdiMagnify,
  mdiSelectGroup,
  mdiTerrain,
  mdiHomeVariantOutline,
  mdiBookOpenPageVariant,
  mdiAccountCircleOutline,
  mdiSourceBranch,
  mdiFormatLetterCase,
  mdiHistory
} from '@mdi/js'
import Crag from '@/models/Crag'
import Area from '@/models/Area'
import Gym from '@/models/Gym'
import User from '@/models/User'
import GuideBookPaper from '@/models/GuideBookPaper'
import Word from '@/models/Word'
import SearchApi from '~/services/oblyk-api/SearchApi'
import CragRoute from '@/models/CragRoute'
import CragSmallCard from '@/components/crags/CragSmallCard'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import UserSmallCard from '@/components/users/UserSmallCard'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import WordCard from '@/components/words/WordCard'
import GlobalSearchChip from '@/components/searches/GlobalSearchChip'
import CragRouteSmallCard from '@/components/cragRoutes/CragRouteSmallCard'
import AreaSmallCard from '@/components/areas/AreaSmallCard'
import Spinner from '~/components/layouts/Spiner'

export default {
  name: 'GlobalSearch',
  components: {
    Spinner,
    AreaSmallCard,
    CragRouteSmallCard,
    GlobalSearchChip,
    WordCard,
    GuideBookPaperSmallCard,
    UserSmallCard,
    GymSmallCard,
    CragSmallCard
  },

  props: {
    globalSearchDialog: Boolean,
    closeDialogue: {
      type: Function,
      required: true
    },
    externalQuery: {
      type: String,
      required: false,
      default: null
    }
  },

  data () {
    return {
      tab: null,
      query: null,
      searching: false,
      onSearch: false,
      previousQuery: null,
      loadingExternalSearch: false,

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
      showWordResults: true,

      searchApi: null,

      mdiChevronDown,
      mdiClose,
      mdiMagnify,
      mdiSelectGroup,
      mdiTerrain,
      mdiHomeVariantOutline,
      mdiBookOpenPageVariant,
      mdiAccountCircleOutline,
      mdiSourceBranch,
      mdiFormatLetterCase,
      mdiHistory
    }
  },

  computed: {
    haveResult () {
      return (this.areaResults.length + this.cragResults.length + this.cragRouteResults.length + this.gymResults.length + this.guideBookPaperResults.length + this.userResults.length + this.wordResults.length > 0)
    }
  },

  mounted () {
    this.query = this.externalQuery
    if (this.query !== null) {
      this.loadingExternalSearch = true
      this.search()
    }

    setTimeout(() => {
      this.giveFocus()
    }, 500)
  },

  methods: {
    previousSearch () {
      if (!process.client) { return [] }

      if (localStorage.getItem('previous-search')) {
        return (localStorage.getItem('previous-search') || '').split('||')
      } else {
        return []
      }
    },

    giveFocus () {
      this.$refs.globalSearchInput.focus()
      this.query = this.externalQuery
    },

    research (query) {
      this.query = query
      this.search()
    },

    closeAndSaveSearch () {
      const savedSearch = this.previousSearch()
      const newSavedSearch = []

      if (!this.query) {
        this.closeDialogue()
        return false
      }

      for (const query of savedSearch) {
        if (query.toLowerCase() !== this.query.toLowerCase()) {
          newSavedSearch.push(query)
        }
      }
      newSavedSearch.unshift(this.query)
      if (process.client) {
        localStorage.setItem('previous-search', newSavedSearch.join('||'))
      }
      this.closeDialogue()
    },

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

    apiSearch () {
      this.searchApi = this.searchApi || new SearchApi(this.$axios, this.$auth)
      this.searchApi.cancelSearch()

      this.searchApi
        .search(this.query)
        .then((resp) => {
          this.clearResults()
          for (const result of resp.data.crags) { this.cragResults.push(new Crag({ attributes: result })) }
          for (const result of resp.data.gyms) { this.gymResults.push(new Gym({ attributes: result })) }
          for (const result of resp.data.guide_book_papers) { this.guideBookPaperResults.push(new GuideBookPaper({ attributes: result })) }
          for (const result of resp.data.users) { this.userResults.push(new User({ attributes: result })) }
          for (const result of resp.data.crag_routes) { this.cragRouteResults.push(new CragRoute({ attributes: result })) }
          for (const result of resp.data.words) { this.wordResults.push(new Word({ attributes: result })) }
          for (const result of resp.data.areas) { this.areaResults.push(new Area({ attributes: result })) }
          this.previousQuery = this.query
        })
        .finally(() => {
          this.searching = false
          this.loadingExternalSearch = false
        })
    },

    clearResults () {
      this.cragResults = []
      this.cragRouteResults = []
      this.gymResults = []
      this.userResults = []
      this.guideBookPaperResults = []
      this.wordResults = []
      this.areaResults = []
    },

    scrollTo (target) {
      const targetId = `#${target}-result-title`
      this.$vuetify.goTo(targetId, { container: '#global-search-results-area' })
    }
  }
}
</script>

<style lang="scss">
.global-search-fields-area {
  margin-top: 12px;
  height: 108px;
  .global-search-chips {
    margin-top: 12px;
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
