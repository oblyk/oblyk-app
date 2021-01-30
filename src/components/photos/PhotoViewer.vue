<template>
  <div class="full-height photo-map-viewer">
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
      return [[0, 0], [this.photo.photo_height / 6, this.photo.photo_width / 6]]
    }
  },

  data () {
    return {
      crs: CRS.Simple,
      url: this.photo.pictureUrl()
    }
  },

  methods: {
    onReadyViewer: function () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setMapView: function () {
      this.map.setView([this.photo.photo_height / 12, this.photo.photo_width / 12], 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light {
  .photo-map-viewer {
    .leaflet-container {
      background-color: #f5f5f5;
    }
  }
}

.theme--dark {
  .photo-map-viewer {
    .leaflet-container {
      background-color: #121212;
    }
  }
}
</style>
