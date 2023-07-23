<template>
  <div
    class="full-height photo-map-viewer"
  >
    <p
      v-if="!urlLoaded"
      class="load-picture-indicator"
    >
      {{ $t('common.loading') }}
    </p>
    <client-only>
      <editable-map
        ref="map"
        editable
        :crs="crs"
        :options="{ zoomControl: false, zoomSnap: 0.1, zoomDelta: 0.1 }"
        style="height: 100%; width: 100%"
        :style="`opacity: ${urlLoaded ? 1 : 0}`"
        @ready="onReadyViewer()"
      >
        <l-image-overlay
          :url="url"
          :bounds="bounds"
          @load="urlLoaded = true"
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
      crs: CRS.Simple,
      urlLoaded: false
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
    url () {
      this.urlLoaded = false
    },
    photo () {
      this.setMapView()
    }
  },

  mounted () {
    this.urlLoaded = true
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
  .load-picture-indicator {
    z-index: 1;
    position: fixed;
    top: calc(100vh / 2);
    width: 100%;
    text-align: center;
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
