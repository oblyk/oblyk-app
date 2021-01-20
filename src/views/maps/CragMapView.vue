<template>
  <leaflet-map
    map-style="outdoor"
    :geo-jsons="geoJsons"
  />
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import CragApi from '@/services/oblyk-api/CragApi'
export default {
  name: 'CragMapView',
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
      CragApi
        .geoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>
