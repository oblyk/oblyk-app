<template>
  <client-only>
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :latitude-force="latitude"
      :longitude-force="longitude"
      :zoom-force="zoom"
    />
  </client-only>
</template>

<script>
import CragApi from '@/services/oblyk-api/CragApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragMapView',
  components: { LeafletMap },

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
    this.zoom = this.latitude !== null ? 15 : null
  },

  methods: {
    getGeoJson () {
      new CragApi(this.$axios, this.$auth)
        .geoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    }
  }
}
</script>
