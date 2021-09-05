<template>
  <div class="mb-7">
    <p class="subtitle-2 mb-0">
      {{ $t(titleKey) }}
    </p>
    <p class="mb-1 caption">
      <cite>{{ $t('components.map.input.explain') }}</cite>
    </p>
    <div class="map-selector">
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
        <l-control position="topright" >
          <leaflet-layer-selector v-model="layerIndex" map-style="outdoor" />
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
import L, { latLng, icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LControl, LControlZoom, LGeoJson } from 'vue2-leaflet'
import OsmNominatim from '@/services/osm-nominatim'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'

export default {
  name: 'MapInput',
  mixins: [MapMarkerHelpers, MapPopupHelpers],
  components: {
    LeafletLayerSelector,
    LMap,
    LMarker,
    LTileLayer,
    LGeoJson,
    LControl,
    LControlZoom
  },

  props: {
    value: Object,
    defaultLatitude: {
      required: false,
      default: 47
    },
    defaultLongitude: {
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
      required: false
    },
    titleKey: {
      type: String,
      default: 'components.map.input.title'
    }
  },

  data () {
    return {
      layerIndex: 0,
      newMarker: latLng(
        this.defaultLatitude || 47,
        this.defaultLongitude || 3.1
      ),
      layers: [
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
      icon: icon({
        iconUrl: '/img/markers/new-marker.png',
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

    onMarkerDragEnd: function () {
      const center = this.$refs.draggableMaker.mapObject.getLatLng()
      this.value.latitude = center.lat.toPrecision(6)
      this.value.longitude = center.lng.toPrecision(6)
      this.addressDetail()
    },

    clickOnMap: function (e) {
      this.$root.$emit('hideLeafletMapLayerSelector')
      this.value.latitude = e.latlng.lat.toPrecision(6)
      this.value.longitude = e.latlng.lng.toPrecision(6)
      this.newMarker = [
        this.value.latitude,
        this.value.longitude
      ]
      this.addressDetail()
    },

    addressDetail: function () {
      OsmNominatim
        .reverseGeocoding(this.value.latitude, this.value.longitude)
        .then((resp) => {
          const address = resp.data.address
          const cityAddress = (address.house_number) ? `${address.house_number}, ${address.road}` : address.road

          this.value.city = address.city || address.town || address.village
          this.value.big_city = address.municipality
          this.value.country = address.country
          this.value.code_country = address.country_code
          this.value.postal_code = address.postcode
          this.value.region = address.county || address.state
          this.value.address = cityAddress
          this.$emit('input', this.value)
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
