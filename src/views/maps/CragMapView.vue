<template>
  <leaflet-map
    map-style="outdoor"
    :geo-jsons="geoJsons"
  />
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import CragApi from '@/services/oblyk-api/CragApi'
import store from '@/store'

export default {
  name: 'CragMapView',
  components: { LeafletMap },

  metaInfo () {
    return {
      title: this.$t('meta.cragMap.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.cragMap.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.cragMap.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.cragMap.description') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/crags` }
      ]
    }
  },

  data () {
    return {
      geoJsons: null
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson: function () {
      store.commit('loader/START_LOADING')
      CragApi
        .geoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
</script>
