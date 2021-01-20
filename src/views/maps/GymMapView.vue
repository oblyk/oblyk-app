<template>
  <leaflet-map
    map-style="indoor"
    :geo-jsons="geoJsons"
  />
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import GymApi from '@/services/oblyk-api/GymApi'

export default {
  name: 'GymMapView',
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
      GymApi
        .geoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>
