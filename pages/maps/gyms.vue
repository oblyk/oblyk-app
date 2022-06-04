<template>
  <client-only>
    <leaflet-map
      map-style="indoor"
      :geo-jsons="geoJsons"
      :latitude-force="latitude"
      :longitude-force="longitude"
      :zoom-force="zoom"
      :show-localization="true"
    />
  </client-only>
</template>

<script>
import GymApi from '@/services/oblyk-api/GymApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GymMapView',
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
      title: this.$t('meta.gymMap.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.gymMap.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.gymMap.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.gymMap.description') },
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
      new GymApi(this.$axios, this.$auth)
        .geoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    }
  }
}
</script>
