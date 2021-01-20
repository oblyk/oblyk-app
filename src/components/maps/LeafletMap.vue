<template>
  <l-map
    ref="leafletMap"
    :zoom="zoom"
    :center="center"
    :options="{
      zoomControl: false,
      worldCopyJump: true
    }"
    @click="hideOpensControl"
    @move="savePosition"
    @zoom="saveZoom"
  >
    <!-- Zoom Control -->
    <l-control-zoom position="topright" />

    <!-- Layer Selector -->
    <l-control position="topright" >
      <leaflet-layer-selector v-model="layerIndex" :map-style="mapStyle" />
    </l-control>

    <!-- Legend -->
    <l-control position="bottomright">
      <leaflet-legend />
    </l-control>

    <!-- Layer -->
    <l-tile-layer
      :url="layer.url"
      :attribution="layer.attribution"
    />

    <!-- GeoJson & Marker cluster -->
    <v-marker-cluster
      :options="{ disableClusteringAtZoom: 12 }"
    >
      <l-geo-json
        v-for="(geojson, index) in geoJsons"
        :key="`geosjon-${index}`"
        :geojson="geoJsons"
        :options="geoJsonOptions"
      />
    </v-marker-cluster>
  </l-map>
</template>
<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlZoom, LGeoJson, LControl } from 'vue2-leaflet'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import LeafletLegend from '@/components/maps/leafletControls/LeafletLegend'

export default {
  name: 'LeafletMap',
  mixins: [MapPopupHelpers, MapMarkerHelpers],

  props: {
    mapStyle: String,
    geoJsons: Object,
    trackLocation: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components: {
    LeafletLegend,
    LeafletLayerSelector,
    LMap,
    LGeoJson,
    LControl,
    LControlZoom,
    LTileLayer,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },

  data () {
    return {
      map: null,
      showLayersSelector: false,
      layerIndex: 0,
      zoom: parseFloat(localStorage.getItem('map-zoom') || '10'),
      center: L.latLng(
        parseFloat(localStorage.getItem('map-latitude') || '45'),
        parseFloat(localStorage.getItem('map-longitude') || '4.5')
      ),
      layers: [
        {
          name: 'Mapbox terrain',
          url: 'https://api.mapbox.com/styles/v1/clucien/ckingo0rf3thf17qovbo16s3b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2x1Y2llbiIsImEiOiJjaWlkYWhuMGswMHRxdmxtMWNyeWpjZGk0In0.-bHAKhr-aUjboWKoE0B-WA',
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Mapbox street',
          url: 'https://api.mapbox.com/styles/v1/clucien/ckioe0rsh08q417p52hr76t8q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2x1Y2llbiIsImEiOiJjaWlkYWhuMGswMHRxdmxtMWNyeWpjZGk0In0.-bHAKhr-aUjboWKoE0B-WA',
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Mapbox satelite',
          url: 'https://api.mapbox.com/styles/v1/clucien/ckjulgum0007217plefa1328h/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2x1Y2llbiIsImEiOiJjaWlkYWhuMGswMHRxdmxtMWNyeWpjZGk0In0.-bHAKhr-aUjboWKoE0B-WA',
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Eseri Topo',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Eseri Satelite',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        }
      ],
      geoJsonOptions: {
        onEachFeature: this.onEachFeatureFunction(),
        pointToLayer: this.pointToLayerFunction()
      }
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    }
  },

  beforeMount () {
    if (this.mapStyle === 'outdoor') {
      this.layerIndex = 0
    } else {
      this.layerIndex = 1
    }
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        return L.marker(latLng, { icon: this.markers[feature.properties.icon] })
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        layer.bindPopup(this.getHtmlPopup(feature))
      }
    },

    hideOpensControl: function () {
      this.$root.$emit('hideLeafletMapLayerSelector')
      this.$root.$emit('hideLeafletMapLegend')
    },

    savePosition: function () {
      if (!this.trackLocation) return

      const center = this.$refs.leafletMap.mapObject.getCenter()
      localStorage.setItem('map-latitude', center.lat)
      localStorage.setItem('map-longitude', center.lng)
    },

    saveZoom: function () {
      if (!this.trackLocation) return

      const zoom = this.$refs.leafletMap.mapObject.getZoom()
      localStorage.setItem('map-zoom', zoom)
    }
  }
}
</script>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.leaflet-popup-content-wrapper {
  border-radius: 4px;
  padding: 0;
}
.leaflet-popup-content {
  margin: 0;
}
.map-popup-cover {
  width: 100%;
}

.leaflet-container a.leaflet-popup-close-button {
  padding-top: 7px;
  width: 30px;
  height: 30px;
}
.leaflet-customer-control {
  background-color: white;
  padding: 10px;
  color: black;
  .v-input {
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
