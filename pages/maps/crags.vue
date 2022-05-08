<template>
  <client-only>
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :latitude-force="latitude"
      :longitude-force="longitude"
      :zoom-force="zoom"
      :show-localization="true"
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

  head () {
    return {
      title: this.$t('meta.cragMap.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.cragMap.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.cragMap.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.cragMap.description') },
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
    this.$store.commit('layout/LAYOUT_PADDING', true)
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
