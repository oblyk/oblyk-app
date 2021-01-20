<template>
  <div class="guide-book-paper-map">
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :trackLocation="false"
    />
  </div>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default {
  name: 'GuideBookPaperMapView',
  components: { LeafletMap },
  props: {
    guideBookPaper: Object
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
      GuideBookPaperApi
        .geoJson(this.guideBookPaper.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>

<style scoped>
.guide-book-paper-map {
  height: calc(100vh - 113px);
  width: 100%;
}
</style>
