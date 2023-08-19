<template>
  <div>
    <v-container class="common-page-container">
      <h1
        v-if="place === null"
        class="mb-10 mt-5 text-center"
      >
        {{ $t('components.guideBookPaperFind.title') }}
      </h1>
      <search-place-input v-model="place" />
      <v-slider
        v-if="place"
        v-model="dist"
        class="body-2"
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
                :guide-book-paper="guideBookObject(guideAndCrags.guide)"
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
import SearchPlaceInput from '@/components/forms/SearchPlaceInput'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaperAroundCard from '@/components/guideBookPapers/GuideBookPaperAroundCard'
import AppFooter from '@/components/layouts/AppFooter'
import GuideBookPaper from '~/models/GuideBookPaper'

export default {
  components: {
    GuideBookPaperAroundCard,
    Spinner,
    SearchPlaceInput,
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

  i18n: {
    messages: {
      fr: {
        metaTitle: "Trouver un topo d'escalade",
        metaDescription: "Trouves les topos d'escalades qu'il y a autour d'une ville ou d'un lieu en France et dans le monde"
      },
      en: {
        metaTitle: 'Find a climbing guide',
        metaDescription: 'Find the climbing topos that are around a city or a place in France and in the world'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  watch: {
    place () {
      this.getGuideBookAround()
    },

    dist () {
      this.getGuideBookAround()
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const latitudeParam = urlParams.get('latitude')
    const longitudeParam = urlParams.get('longitude')
    const postalCodeParam = urlParams.get('postal_code')
    const codeCountryParam = urlParams.get('code_country')
    const countryParam = urlParams.get('country')
    const cityParam = urlParams.get('city')
    const regionParam = urlParams.get('region')
    const addressParam = urlParams.get('address')
    const bigCityParam = urlParams.get('big_city')
    if (latitudeParam) {
      this.place = {
        lat: latitudeParam,
        lng: longitudeParam,
        postal_code: postalCodeParam,
        code_country: codeCountryParam,
        country: countryParam,
        city: cityParam,
        big_city: bigCityParam,
        region: regionParam,
        address: addressParam
      }
      this.getGuideBookAround()
    }
  },

  methods: {
    getGuideBookAround () {
      this.loadGuidesAround = true
      new GuideBookPaperApi(this.$axios, this.$auth)
        .around(this.place.lat, this.place.lng, this.dist)
        .then((resp) => {
          this.guidesAndCrags = resp.data
        })
        .finally(() => {
          this.loadGuidesAround = false
        })
    },

    guideBookObject (guideBook) {
      return GuideBookPaper({ attributes: guideBook })
    }
  }
}
</script>
