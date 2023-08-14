<template>
  <div class="mb-7">
    <p class="subtitle-2 mb-0">
      {{ $t(titleKey) }}
    </p>
    <p class="mb-1 caption">
      <cite>{{ $t('components.map.input.explain') }}</cite>
    </p>
    <div class="map-selector">
      <client-only>
        <l-map
          :zoom="defaultZoom"
          :center="[defaultLatitude || 47, defaultLongitude || 3.1]"
          :options="{
            zoomControl: false,
            worldCopyJump: true
          }"
          @click="clickOnMap"
        >
          <l-control-zoom position="topright" />

          <!-- Layer Selector -->
          <l-control position="topright">
            <leaflet-layer-selector
              ref="leafletLayerSelector"
              v-model="layerIndex"
              :layers="layers"
            />
          </l-control>

          <l-tile-layer
            :url="layer.url"
            :attribution="layer.attribution"
          />

          <l-geo-json
            v-if="geoJsons"
            :geojson="geoJsons"
            :options="geoJsonOptions"
          />

          <l-marker
            ref="draggableMaker"
            :draggable="true"
            :icon="icon"
            :lat-lng="newMarker"
            @dragend="onMarkerDragEnd"
          />
        </l-map>
      </client-only>
    </div>
    <p class="caption mt-1">
      <cite v-if="value.latitude">
        [{{ value.latitude }}, {{ value.longitude }}]
        {{ value.country }}({{ value.country_code }}) -
        {{ value.region }}
      </cite>
    </p>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LControl, LControlZoom, LGeoJson } from 'vue2-leaflet'
import OsmNominatim from '~/services/osm-nominatim'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'

export default {
  name: 'MapInput',
  components: {
    LeafletLayerSelector,
    LMap,
    LMarker,
    LTileLayer,
    LGeoJson,
    LControl,
    LControlZoom
  },
  mixins: [MapMarkerHelpers, MapPopupHelpers],

  props: {
    value: {
      type: Object,
      default: null
    },
    defaultLatitude: {
      type: [Number, String],
      required: false,
      default: 47
    },
    defaultLongitude: {
      type: [Number, String],
      required: false,
      default: 3.1
    },
    defaultZoom: {
      type: Number,
      default: 5
    },
    styleMap: {
      type: String,
      default: 'outdoor',
      required: false
    },
    geoJsons: {
      type: Object,
      default: null
    },
    titleKey: {
      type: String,
      default: 'components.map.input.title'
    }
  },

  data () {
    return {
      mapValue: this.value,
      layerIndex: 0,
      newMarker: L.latLng(
        this.defaultLatitude || 47,
        this.defaultLongitude || 3.1
      ),
      layers: [
        {
          title: 'relief',
          name: 'Eseri Topo',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          title: 'reliefMapbox',
          name: 'Mapbox Outdoor',
          url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_TERRAIN_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          title: 'satellite',
          name: 'Mapbox',
          url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_SATELLITE_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          title: 'detailedRelief',
          name: 'CyclOSM',
          url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.cyclosm.org">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        }
      ],
      icon: L.icon({
        iconUrl: '/markers/new-marker.png',
        iconSize: [23, 30],
        iconAnchor: [11.5, 30],
        popupAnchor: [0, 0]
      }),
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
    this.layerIndex = 0
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        return L.marker(latLng, { icon: L.icon(this.markers[feature.properties.icon]) })
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        layer.bindPopup(this.getHtmlPopup(feature))
      }
    },

    onMarkerDragEnd () {
      const center = this.$refs.draggableMaker.mapObject.getLatLng()
      this.mapValue.latitude = center.lat.toPrecision(6)
      this.mapValue.longitude = center.lng.toPrecision(6)
      this.addressDetail()
    },

    clickOnMap (e) {
      this.$refs.leafletLayerSelector.hideLeafletMapLayerSelector()
      this.$root.$emit('hideLeafletMapLayerSelector')
      this.mapValue.latitude = e.latlng.lat.toPrecision(6)
      this.mapValue.longitude = e.latlng.lng.toPrecision(6)
      this.newMarker = [
        this.value.latitude,
        this.value.longitude
      ]
      this.addressDetail()
    },

    addressDetail () {
      new OsmNominatim(this.$axios)
        .reverseGeocoding(this.mapValue.latitude, this.mapValue.longitude)
        .then((resp) => {
          const address = resp.data.address
          const cityAddress = (address.house_number) ? `${address.house_number}, ${address.road}` : address.road

          this.mapValue.city = address.city || address.town || address.village
          this.mapValue.big_city = address.municipality
          this.mapValue.country = address.country
          this.mapValue.code_country = address.country_code
          this.mapValue.postal_code = address.postcode
          this.mapValue.region = address.county || address.state
          this.mapValue.address = cityAddress
          this.$emit('input', this.mapValue)
        })
    }
  }
}
</script>
<style lang="scss">
.map-selector {
  width: 100%;
  height: 350px;

  .leaflet-container {
    cursor: crosshair;
  }
}
</style>
