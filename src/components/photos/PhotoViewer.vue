<template>
  <div
    class="full-height photo-map-viewer"
  >
    <editable-map
      editable
      ref="map"
      :crs="crs"
      :options="{ zoomControl: false }"
      style="height: 100%; width: 100%"
      @ready="onReadyViewer()"
    >
      <l-image-overlay
        :url="url"
        :bounds="bounds"
      />
    </editable-map>
  </div>
</template>

<script>
import { CRS } from 'leaflet'
import { EditableMap } from 'vue2-leaflet-editable'
import { LImageOverlay } from 'vue2-leaflet'

export default {
  name: 'PhotoViewer',
  props: {
    photo: Object
  },

  components: {
    EditableMap,
    LImageOverlay
  },

  computed: {
    bounds: function () {
      return [[0, 0], [this.photo.photo_height / 10, this.photo.photo_width / 10]]
    },

    url: function () {
      return this.photo.pictureUrl()
    }
  },

  watch: {
    photo: function () {
      this.setMapView()
    }
  },

  data () {
    return {
      crs: CRS.Simple
    }
  },

  methods: {
    onReadyViewer: function () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setMapView: function () {
      this.map.fitBounds(this.bounds)
    }
  }
}
</script>

<style lang="scss">
.photo-map-viewer {
  .leaflet-container {
    background-color: #121212;
  }
  .leaflet-control-attribution {
    background: none !important;
    padding-bottom: 6px;
    margin-right: -5px;
    a {
      color: white;
    }
  }
}
</style>
