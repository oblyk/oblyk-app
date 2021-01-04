<template>
  <div>
    <v-form @submit.prevent="search">
      <v-text-field
        :label="$t('components.search.searchLabel')"
        v-model="query"
        append-icon="mdi-magnify"
        outlined
        autofocus
      ></v-text-field>
    </v-form>
    <div v-if="!load">
      <div v-for="result in results" :key="`${result.record_type}${result.record_id}`">
        <crag-search-result v-if="result.record_type === 'Crag'" :crag-data="result.record" class="mb-3" />
        <crag-route-search-result v-if="result.record_type === 'CragRoute'" :crag-route="result.record" class="mb-3" />
        <crag-sector-search-result v-if="result.record_type === 'CragSector'" :crag-sector="result.record" class="mb-3" />
        <gym-search-result v-if="result.record_type === 'Gym'" :gym-data="result.record" class="mb-3" />
        <guide-book-search-result v-if="result.record_type === 'GuideBookPaper'" :guide-book="result.record" class="mb-3" />
        <word-card v-if="result.record_type === 'Word'" :word="recordObject('Word', result.record)" class="mb-3" />
      </div>
    </div>
    <div v-if="load">
      <spinner />
    </div>
  </div>
</template>
<script>
import SearchApi from '@/services/oblyk-api/searchApi'
import Spinner from '@/components/layouts/Spiner'
import CragSearchResult from '@/components/searches/CragSearchResult'
import CragRouteSearchResult from '@/components/searches/CragRouteSearchResult'
import GymSearchResult from '@/components/searches/GymSearchResult'
import GuideBookSearchResult from '@/components/searches/GuideBookSearchResult'
import CragSectorSearchResult from '@/components/searches/CragSectorSearchResult'
import WordCard from '@/components/words/WordCard'
import Word from '@/models/Word'

export default {
  name: 'SearchFiled',
  components: {
    WordCard,
    CragSectorSearchResult,
    GuideBookSearchResult,
    GymSearchResult,
    CragRouteSearchResult,
    CragSearchResult,
    Spinner
  },

  data () {
    return {
      load: false,
      query: null,
      results: []
    }
  },

  methods: {
    search: function () {
      this.load = true
      SearchApi
        .search(this.query)
        .then(resp => {
          this.results = resp.data
        })
        .then(() => {
          this.load = false
        })
    },

    recordObject: function (type, data) {
      if (type === 'Word') {
        return new Word(data)
      }
    }
  }
}
</script>
