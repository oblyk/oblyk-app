<template>
  <div class="photo-map">
    <l-map
      :zoom="14"
      :center="[parseFloat(photo.illustrable.location[0]), parseFloat(photo.illustrable.location[1])]"
      :options="{
          zoomControl: false,
          worldCopyJump: true
        }"
    >
      <l-control-zoom position="topright" />

      <l-tile-layer
        :url="layerUrl"
        :attribution="layerAttribution"
      />

      <l-geo-json
        v-if="geoJsons"
        :geojson="geoJsons"
        :options="geoJsonOptions"
      />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LGeoJson } from 'vue2-leaflet'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'PhotoMap',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LControlZoom
  },
  mixins: [MapMarkerHelpers],
  props: {
    photo: Object
  },

  data () {
    return {
      layerUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      layerAttribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors',
      geoJsons: null,
      geoJsonOptions: {
        pointToLayer: this.pointToLayerFunction()
      }
    }
  },

  watch: {
    photo: function () {
      this.setGeoJson()
    }
  },

  created () {
    this.setGeoJson()
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        return L.marker(latLng, { icon: this.markers[feature.properties.icon] })
      }
    },

    setGeoJson: function () {
      this.geoJsons = {
        features: [
          {
            type: 'Feature',
            properties: {
              type: 'Photo',
              icon: 'photo-marker'
            },
            geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(this.photo.illustrable.location[1]),
                parseFloat(this.photo.illustrable.location[0]),
                0.0
              ]
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
.photo-map {
  height: 350px;
  width: 350px;
}
</style>
