<template>
  <div class="full-height d-flex flex-column">
    <div class="flex-shrink-0">
      <guide-book-paper-page-header />
    </div>
    <div class="flex-grow-1">
      <client-only>
        <leaflet-map
          map-style="outdoor"
          :geo-jsons="geoJsons"
          :latitude-force="latitude"
          :longitude-force="longitude"
          :zoom-force="zoom"
          :clustered="false"
          :search-place="false"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaperPageHeader from '~/components/guideBookPapers/layouts/GuideBookPaperPageHeader.vue'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GymMapView',
  components: { GuideBookPaperPageHeader, LeafletMap },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Carte des topos de France et ailleurs',
        metaDescription: 'Voir la carte interactive des topos de grimpe sur Oblyk, que ce soit en France, ou dans le Monde, et voir leurs informations détaillées'
      },
      en: {
        metaTitle: 'Map of climbing guide books in France and elsewhere',
        metaDescription: 'See the interactive map of climbing guide books on Oblyk, either in France, or in the World, and see their detailed information'
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/gyms` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    this.zoom = this.latitude !== null ? 15 : null
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new GuideBookPaperApi(this.$axios, this.$auth)
        .geoIndex()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    }
  }
}
</script>
