<template>
  <leaflet-map
    v-if="crag"
    class="crag-sector-map"
    :track-location="false"
    :geo-jsons="geoJsons"
    :zoom-force="16"
    :latitude-force="parseFloat(cragSector.latitude || crag.latitude)"
    :longitude-force="parseFloat(cragSector.longitude || crag.longitude)"
    :scroll-wheel-zoom="false"
    map-style="outdoor"
  />
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import { CragConcern } from '@/concerns/CragConcern'
import CragApi from '@/services/oblyk-api/CragApi'
export default {
  name: 'CragSectorMapView',
  components: { LeafletMap },
  mixins: [CragConcern],
  props: {
    cragSector: Object
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
      CragApi
        .geoJsonAround(this.crag.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-map {
  height: 600px;
}
</style>
