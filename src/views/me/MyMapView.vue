<template>
  <leaflet-map
    map-style="outdoor"
    :geo-jsons="geoJsons"
    :track-location="false"
    :clustered="false"
  />
</template>

<script>
import store from '@/store'
import UserApi from '@/services/oblyk-api/UserApi'
import LeafletMap from '@/components/maps/LeafletMap'

export default {
  name: 'MyMapView',
  components: { LeafletMap },
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
      UserApi
        .ascendedCragsGeoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.$root.$emit('fitMapOnGeoJsonBounds')
          }, 1000)
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
</script>
