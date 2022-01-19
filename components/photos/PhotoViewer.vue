<template>
  <div
    class="full-height photo-map-viewer"
  >
    <client-only>
      <editable-map
        ref="map"
        editable
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
    </client-only>
  </div>
</template>

<script>
import { CRS } from 'leaflet'
import { EditableMap } from 'vue2-leaflet-editable'
import { LImageOverlay } from 'vue2-leaflet'

export default {
  name: 'PhotoViewer',
  components: {
    EditableMap,
    LImageOverlay
  },

  props: {
    photo: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      crs: CRS.Simple
    }
  },

  computed: {
    bounds () {
      return [[0, 0], [this.photo.photo_height / 10, this.photo.photo_width / 10]]
    },

    url () {
      return this.photo.pictureUrl
    }
  },

  watch: {
    photo () {
      this.setMapView()
    }
  },

  methods: {
    onReadyViewer () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setMapView () {
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
