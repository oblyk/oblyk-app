<template>
  <div class="gym-space-map">
    <l-map
      ref="map"
      :min-zoom="minZoom"
      :crs="crs"
      style="height: 100%; width: 100%"
    >
      <l-image-overlay
        :url="url"
        :bounds="bounds"
      />
    </l-map>
  </div>
</template>
<script>
import { CRS } from 'leaflet'
import { LMap, LImageOverlay } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'GymSpacePlan',
  components: {
    LMap,
    LImageOverlay
  },

  props: {
    gymSpace: Object
  },

  data () {
    return {
      url: this.gymSpace.planUrl(),
      bounds: [[0, 0], [this.gymSpace.scheme_height, this.gymSpace.scheme_width]],
      minZoom: -2,
      crs: CRS.Simple
    }
  },

  mounted () {
    this.$refs.map.mapObject.setView([this.gymSpace.scheme_height / 2, this.gymSpace.scheme_width / 2], -5)
  }
}
</script>
<style lang="scss">
.gym-space-map {
  height: calc(100vh - 64px);
}
</style>
