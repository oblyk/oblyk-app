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
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import LeafletMap from '@/components/maps/LeafletMap'

export default {
  name: 'CurrentUserMapView',
  components: { LeafletMap },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.map')
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
      CurrentUserApi
        .ascendedCragsGeoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
          if (resp.data.features.length > 0) {
            setTimeout(() => {
              this.$root.$emit('fitMapOnGeoJsonBounds')
            }, 1000)
          }
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
</script>
