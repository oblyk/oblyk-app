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
        <crag-route-small-card class="mb-2" v-if="result.record_type === 'CragRoute'" :crag-route="recordToObject('CragRoute', result.record)"  />
        <crag-sector-small-card class="mb-2" v-if="result.record_type === 'CragSector'" :crag-sector="recordToObject('CragSector', result.record)"  />
        <gym-small-card class="mb-2" v-if="result.record_type === 'Gym'" :gym="recordToObject('Gym', result.record)" />
        <crag-small-card class="mb-2" v-if="result.record_type === 'Crag'" :crag="recordToObject('Crag', result.record)" />
        <guide-book-paper-small-card class="mb-2" v-if="result.record_type === 'GuideBookPaper'" :guide-book-paper="recordToObject('GuideBookPaper', result.record)" />
        <word-card v-if="result.record_type === 'Word'" :word="recordToObject('Word', result.record)" class="mb-3" />
      </div>
    </div>
    <div v-if="load">
      <spinner />
    </div>
  </div>
</template>
<script>
import SearchApi from '@/services/oblyk-api/SearchApi'
import Spinner from '@/components/layouts/Spiner'
import WordCard from '@/components/words/WordCard'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import CragSmallCard from '@/components/crags/CragSmallCard'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import CragRouteSmallCard from '@/components/cragRoutes/CragRouteSmallCard'
import CragSectorSmallCard from '@/components/cragSectors/CragSectorSmallCard'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'

export default {
  name: 'SearchFiled',
  mixins: [RecordToObjectHelpers],
  components: {
    CragSectorSmallCard,
    CragRouteSmallCard,
    GuideBookPaperSmallCard,
    CragSmallCard,
    GymSmallCard,
    WordCard,
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
    }
  }
}
</script>
