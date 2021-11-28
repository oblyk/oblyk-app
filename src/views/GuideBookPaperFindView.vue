<template>
  <div>
    <v-container class="common-page-container">
      <h1
        v-if="place === null"
        class="loved-by-king mb-10 mt-5 text-center"
      >
        {{ $t('components.guideBookPaperFind.title') }}
      </h1>
      <search-place-localisation v-model="place" />
      <v-slider
        v-if="place"
        v-model="dist"
        step="20"
        ticks="always"
        tick-size="5"
        min="0"
        :tick-labels="[$t('components.guideBookPaperFind.ray'), '20km', '40km', '60km', '80km', '100km']"
      />
      <spinner v-if="loadGuidesAround" />

      <div v-else>
        <!-- if we have found guides -->
        <div v-if="guidesAndCrags.length > 0 && place !== null">
          <p
            class="mt-4 mb-6"
            v-html="$tc('components.guideBookPaperFind.findGuideInRay', guidesAndCrags.length, { count: guidesAndCrags.length, dist: dist, city: place.city } )"
          />
          <div
            v-for="(guideAndCrags, index) in guidesAndCrags"
            :key="`around-guides-${index}`"
          >
            <div>
              <guide-book-paper-around-card
                class="mt-3"
                :guide-book-paper="recordToObject('GuideBookPaper', guideAndCrags.guide)"
                :crag-in="guideAndCrags.crags_in_area"
                :dist="dist"
                :place="place"
                :geo-json="guideAndCrags.geo_json"
                :crag-out="guideAndCrags.crags_out_of_area"
              />
            </div>
          </div>
        </div>

        <!-- no guide found -->
        <div v-if="guidesAndCrags.length === 0 && place !== null">
          <p class="mt-16 mb-10 text-center text--disabled">
            <strong>
              {{ $t('components.guideBookPaperFind.noGuideFound', { dist: dist, city: place.city }) }}
            </strong><br>
            {{ $t('components.guideBookPaperFind.searchAnotherCity') }}
          </p>
        </div>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import SearchPlaceLocalisation from '@/components/forms/SearchPlaceInput'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaperAroundCard from '@/components/guideBookPapers/GuideBookPaperAroundCard'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GuideBookPaperFindView',
  mixins: [RecordToObjectHelpers],
  components: {
    GuideBookPaperAroundCard,
    Spinner,
    SearchPlaceLocalisation,
    AppFooter
  },

  data () {
    return {
      place: null,
      dist: 20,
      loadGuidesAround: false,
      guidesAndCrags: []
    }
  },

  watch: {
    place: function () {
      this.getGuideBookAround()
    },

    dist: function () {
      this.getGuideBookAround()
    }
  },

  methods: {
    getGuideBookAround: function () {
      this.loadGuidesAround = true
      GuideBookPaperApi
        .around(this.place.lat, this.place.lng, this.dist)
        .then(resp => {
          this.guidesAndCrags = resp.data
        })
        .finally(() => {
          this.loadGuidesAround = false
        })
    }
  }
}
</script>
