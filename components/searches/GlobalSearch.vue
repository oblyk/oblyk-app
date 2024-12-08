<template>
  <v-card :loading="searching">
    <!-- Search filed and chips count result -->
    <div class="global-search-fields-area pt-4">
      <div class="d-flex align-center">
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
        <v-btn
          class="ml-auto"
          icon
          large
          @click="closeDialogue()"
        >
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </div>

      <v-tabs
        height="35"
        show-arrows
      >
        <v-tab @click="changeCollection(['Crag', 'Gym', 'GuideBookPaper', 'Area'])">
          <v-icon>
            {{ mdiAsterisk }}
          </v-icon>
        </v-tab>
        <v-tab @click="changeCollection(['Crag', 'Area'])">
          <v-icon left>
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.search.tabs.crag') }}
        </v-tab>
        <v-tab @click="changeCollection(['Gym'])">
          <v-icon left>
            {{ mdiOfficeBuildingMarker }}
          </v-icon>
          {{ $t('components.search.tabs.gym') }}
        </v-tab>
        <v-tab @click="changeCollection(['GuideBookPaper'])">
          <v-icon left>
            {{ mdiBookOpenPageVariant }}
          </v-icon>
          {{ $t('components.search.tabs.guideBookPaper') }}
        </v-tab>
        <v-tab @click="changeCollection(['CragRoute'])">
          <v-icon left>
            {{ mdiSourceBranch }}
          </v-icon>
          {{ $t('components.search.tabs.cragRoute') }}
        </v-tab>
        <v-tab @click="changeCollection(['User'])">
          <v-icon left>
            {{ mdiAccountCircleOutline }}
          </v-icon>
          {{ $t('components.search.tabs.user') }}
        </v-tab>
        <v-tab @click="changeCollection(['Word'])">
          <v-icon left>
            {{ mdiFormatLetterCase }}
          </v-icon>
          {{ $t('components.search.tabs.word') }}
        </v-tab>
      </v-tabs>
    </div>

    <div>
      <spinner v-if="loadingExternalSearch" />
      <div v-else>
        <div v-if="currentResults && currentResults.results">
          <div
            v-for="(result, index) in currentResults.results"
            :key="`result-${index}`"
            class="mt-1"
            @click="closeAndSaveSearch()"
          >
            <crag-small-card v-if="result.className === 'Crag'" :small="true" :crag="result" />
            <area-small-card v-if="result.className === 'Area'" :area="result" />
            <gym-small-card v-if="result.className === 'Gym'" :small="true" :gym="result" />
            <guide-book-paper-small-card v-if="result.className === 'GuideBookPaper'" :guide-book-paper="result" />
            <user-small-card v-if="result.className === 'User'" :user="result" :small="true" />
            <crag-route-small-card v-if="result.className === 'CragRoute'" :crag-route="result" :small="true" />
            <word-card v-if="result.className === 'Word'" :flat="true" :small="true" :word="result" />
          </div>
          <loading-more
            v-if="!searching"
            :key="`loading-more-${resultChangeKey}`"
            :get-function="searchNextPage"
            :loading-more="loadingMoreText"
            :no-more-data="currentResults.noMoreData"
            skeleton-type="list-item-avatar"
          />
          <p
            v-if="!searching && currentResults && currentResults.results.length === 0 && normalizeQuery"
            class="py-7 text--disabled text-center"
            v-html="$t('components.search.noResultsFor', { query: normalizeQuery })"
          />
        </div>
        <div
          v-if="!loadingMoreText"
          class="mt-8 px-4"
        >
          <div v-if="!openSearchAround">
            <p class="font-weight-bold text-decoration-underline text-center">
              {{ $t('components.search.map.find') }}
            </p>
            <v-row class="justify-center">
              <v-col cols="12" md="4" lg="2" class="pb-0">
                <v-card
                  class="text-center pa-4 border"
                  @click="mapClick('/maps/crags')"
                >
                  <div class="mb-2">
                    <v-icon>
                      {{ mdiTerrain }}
                    </v-icon>
                  </div>
                  {{ $t('components.search.map.crag') }}
                </v-card>
              </v-col>
              <v-col cols="12" md="4" lg="2" class="pb-0">
                <v-card
                  class="text-center pa-4 border"
                  @click="mapClick('/maps/gyms')"
                >
                  <div class="mb-2">
                    <v-icon>
                      {{ mdiOfficeBuildingMarker }}
                    </v-icon>
                  </div>
                  {{ $t('components.search.map.gym') }}
                </v-card>
              </v-col>
              <v-col cols="12" md="4" lg="2" class="pb-0">
                <v-card
                  class="text-center pa-4 border"
                  @click="mapClick('/maps/climbers')"
                >
                  <div class="mb-2">
                    <v-icon>
                      {{ mdiAccountCircleOutline }}
                    </v-icon>
                  </div>
                  {{ $t('components.search.map.climber') }}
                </v-card>
              </v-col>
            </v-row>
          </div>

          <p class="font-weight-bold text-decoration-underline text-center mt-8">
            {{ $t('components.search.searchAroundTitle') }}
          </p>
          <div>
            <div class="text-center">
              <v-btn
                v-if="$store.getters['geolocation/IAmGeolocated']"
                outlined
                text
                :loading="loadingAround"
                @click="launchSearchAround"
              >
                <v-icon left>
                  {{ openSearchAround ? mdiClose : mdiMapMarkerRadius }}
                </v-icon>
                {{ $t('actions.aroundMe') }}
              </v-btn>
              <v-row v-else>
                <v-col cols="12" lg="6" offset-lg="3">
                  <v-card
                    class="border rounded-sm pa-4"
                    @click="openGeoLocalizationModal"
                  >
                    <div class="mb-2">
                      <v-icon left>
                        {{ mdiMapMarkerRadius }}
                      </v-icon>
                    </div>
                    {{ $t('components.search.activeLocalization') }}
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div v-if="openSearchAround">
              <div
                v-for="(aroundResult, aroundResultIndex) in aroundResults"
                :key="`around-result-index-${aroundResultIndex}`"
              >
                <gym-small-card
                  v-if="aroundResult.className === 'Gym'"
                  :gym="aroundResult"
                  small
                />
                <crag-small-card
                  v-if="aroundResult.className === 'Crag'"
                  :crag="aroundResult"
                  small
                />
              </div>
              <loading-more
                v-if="aroundResults.length > 0"
                :no-more-data="noMoreDataToLoad"
                :loading-more="loadingMoreData"
                :get-function="searchAround"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import {
  mdiClose,
  mdiMagnify,
  mdiTerrain,
  mdiBookOpenPageVariant,
  mdiAccountCircleOutline,
  mdiSourceBranch,
  mdiFormatLetterCase,
  mdiOfficeBuildingMarker,
  mdiAsterisk,
  mdiMapMarkerRadius
} from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
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
import CragRouteSmallCard from '@/components/cragRoutes/CragRouteSmallCard'
import AreaSmallCard from '@/components/areas/AreaSmallCard'
import Spinner from '~/components/layouts/Spiner'
import LoadingMore from '~/components/layouts/LoadingMore'

export default {
  name: 'GlobalSearch',
  components: {
    LoadingMore,
    Spinner,
    AreaSmallCard,
    CragRouteSmallCard,
    WordCard,
    GuideBookPaperSmallCard,
    UserSmallCard,
    GymSmallCard,
    CragSmallCard
  },
  mixins: [LoadingMoreHelpers],

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
      query: null,
      searching: false,
      onSearch: false,
      loadingExternalSearch: false,
      loadingMoreText: false,
      noMoreResults: {},
      collections: ['Crag', 'Gym', 'GuideBookPaper', 'Area'],

      results: {},

      aroundResults: [],
      loadingAround: false,
      openSearchAround: false,

      searchApi: null,
      resultChangeKey: 0,

      mdiClose,
      mdiMagnify,
      mdiTerrain,
      mdiBookOpenPageVariant,
      mdiAccountCircleOutline,
      mdiSourceBranch,
      mdiFormatLetterCase,
      mdiOfficeBuildingMarker,
      mdiAsterisk,
      mdiMapMarkerRadius
    }
  },

  computed: {
    normalizeQuery () {
      return this.query?.trim() || null
    },

    currentResults () {
      if (this.normalizeQuery === null || this.resultChangeKey < 0) {
        return false
      } else if (typeof this.results[this.normalizeQuery] === 'object') {
        return this.results[this.normalizeQuery] || {}
      } else {
        return {}
      }
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
    giveFocus () {
      this.$refs.globalSearchInput.focus()
      this.query = this.externalQuery
    },

    changeCollection (collections) {
      this.collections = collections
      this.results = {}
      if (this.query === null) { return false }
      this.loadingExternalSearch = true
      this.search()
    },

    closeAndSaveSearch () {
      this.closeDialogue()
    },

    mapClick (route) {
      this.$router.push(route)
      this.closeDialogue()
    },

    search () {
      if (this.normalizeQuery === null || typeof this.results[this.normalizeQuery] === 'object') {
        this.searching = false
        return
      }

      this.searching = true
      this.onSearch = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }
      this.searchTimeOut = setTimeout(() => {
        this.apiSearch(this.normalizeQuery)
      }, 500)
    },

    searchNextPage () {
      this.apiSearch(this.normalizeQuery)
    },

    apiSearch (query) {
      this.searchApi = this.searchApi || new SearchApi(this.$axios, this.$auth)
      this.searchApi.cancelSearch()

      this.results[query] ||= {
        page: 0,
        noMoreData: false,
        results: []
      }
      this.results[query].page += 1
      this.loadingMoreText = true
      this.openSearchAround = false

      this.searchApi
        .searchAll(query, this.collections, this.results[query].page)
        .then((resp) => {
          const data = resp.data
          for (const result of data.results) {
            if (result.result_type === 'Crag') { this.results[data.query].results.push(new Crag({ attributes: result.result_object })) }
            if (result.result_type === 'Gym') { this.results[data.query].results.push(new Gym({ attributes: result.result_object })) }
            if (result.result_type === 'GuideBookPaper') { this.results[data.query].results.push(new GuideBookPaper({ attributes: result.result_object })) }
            if (result.result_type === 'User') { this.results[data.query].results.push(new User({ attributes: result.result_object })) }
            if (result.result_type === 'CragRoute') { this.results[data.query].results.push(new CragRoute({ attributes: result.result_object })) }
            if (result.result_type === 'Word') { this.results[data.query].results.push(new Word({ attributes: result.result_object })) }
            if (result.result_type === 'Area') { this.results[data.query].results.push(new Area({ attributes: result.result_object })) }
          }
          if (data.results.length < 25) {
            this.results[data.query].noMoreData = true
          }
        })
        .catch(() => {
          this.results[query].noMoreData = true
        })
        .finally(() => {
          this.resultChangeKey += 1
          this.searching = false
          this.loadingExternalSearch = false
          this.loadingMoreText = false
        })
    },

    openGeoLocalizationModal () {
      this.$root.$emit('ShowLocalizationPopup', true)
    },

    launchSearchAround () {
      if (this.openSearchAround) {
        this.openSearchAround = false
        this.aroundResults = []
        this.resetLoadMorePageNumber()
      } else {
        this.searchAround()
      }
    },

    searchAround () {
      this.loadingAround = true
      this.openSearchAround = true
      this.results = {}
      this.query = null
      this.moreIsBeingLoaded()
      new SearchApi(this.$axios, this.$auth)
        .searchAround(
          this.$store.state.geolocation.latitude,
          this.$store.state.geolocation.longitude,
          this.page
        )
        .then((resp) => {
          for (const data of resp.data) {
            if (data.type === 'Gym') { this.aroundResults.push(new Gym({ attributes: data.data })) }
            if (data.type === 'Crag') { this.aroundResults.push(new Crag({ attributes: data.data })) }
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingAround = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
