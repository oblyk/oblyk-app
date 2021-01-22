<template>
  <div class="full-height">
    <leaflet-map
      class="crag-map"
      :track-location="false"
      :geo-jsons="geoJsons"
      :zoom-force="16"
      :latitude-force="parseFloat(crag.latitude)"
      :longitude-force="parseFloat(crag.longitude)"
      :scroll-wheel-zoom="false"
      map-style="outdoor"
    />
    <v-btn
      class="mb-5 mt-5"
      text
      color="primary"
      :to="crag.path('parks/new')"
    >
      <v-icon left>
        mdi-parking
      </v-icon>
      {{ $t('actions.addPark') }}
    </v-btn>
  </div>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import CragApi from '@/services/oblyk-api/CragApi'

export default {
  name: 'CragMapDetailsView',
  components: { LeafletMap },
  props: {
    crag: Object
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
.crag-map {
  height: calc(100vh - 250px);
}
</style>
