<template>
  <div class="mb-7">
    <p class="subtitle-2 mb-0">
      {{ $t('components.map.input.title') }}
    </p>
    <p class="mb-1 caption">
      <cite>{{ $t('components.map.input.explain') }}</cite>
    </p>
    <div class="map-selector">
      <l-map
        :zoom="defaultZoom"
        :center="[defaultLatitude, defaultLongitude]"
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
import { latLng, icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LControl, LControlZoom } from 'vue2-leaflet'
import OsmNominatim from '@/services/osm-nominatim'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'

export default {
  name: 'MapInput',
  components: {
    LeafletLayerSelector,
    LMap,
    LMarker,
    LTileLayer,
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
    }
  },

  data () {
    return {
      layerIndex: 0,
      newMarker: latLng(
        this.defaultLatitude,
        this.defaultLongitude
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
        }
      ],
      icon: icon({
        iconUrl: require('@/assets/markers/new-marker.png'),
        iconSize: [23, 30],
        iconAnchor: [11.5, 30],
        popupAnchor: [0, 0]
      })
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    }
  },

  methods: {
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
