<template>
  <client-only>
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :latitude-force="latitude"
      :longitude-force="longitude"
      :zoom-force="zoom"
      :magic-card="true"
      :search-place="true"
      :crag-add-fetching="true"
      :load-add-features="loadAddFeatures"
      :loading-crag="loadingCrag"
      :crag="crag"
      :crag-map-filter="true"
      :filter-callback="getGeoJson"
    />
  </client-only>
</template>

<script>
import CragApi from '@/services/oblyk-api/CragApi'
import Crag from '~/models/Crag'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragMapView',
  components: { LeafletMap },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null,
      loadAddFeatures: false,
      cragId: null,
      crag: null,
      loadingCrag: false
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Carte des sites d'escalade en France et ailleurs",
        metaDescription: 'Voir la carte interactive des sites naturels de grimpe sur Oblyk, que ce soit en France, ou dans le Monde, et voir leurs informations détaillées'
      },
      en: {
        metaTitle: 'Map of climbing sites in France and elsewhere',
        metaDescription: 'See the interactive map of natural climbing sites on Oblyk, either in France, or in the World, and see their detailed information'
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
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/crags` }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    this.cragId = urlParams.get('crag_id')
    if (urlParams.get('lat')) { this.zoom = parseInt(urlParams.get('zoom')) }
    if (this.cragId) {
      this.getCrag()
    }
  },

  methods: {
    getGeoJson (params = null) {
      new CragApi(this.$axios, this.$auth)
        .geoJson(true, params)
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => { this.loadAddFeatures = true }, 1000)
        })
        .finally(() => {})
    },

    getCrag () {
      this.loadingCrag = true
      new CragApi(this.$axios, this.$auth)
        .find(this.cragId)
        .then((resp) => {
          this.crag = new Crag({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingCrag = false
        })
    }
  }
}
</script>
