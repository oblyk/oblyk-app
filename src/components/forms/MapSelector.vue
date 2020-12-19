<template>
  <div class="mb-7">
    <p class="subtitle-2 mb-0">
      Localisation
    </p>
    <p class="mb-1 caption">
      <cite>Cliquez sur la carte, ou glisser le marquer pour changer la localisation</cite>
    </p>
    <div class="map-selector">
      <mgl-map
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        @load="onMapLoaded"
        @click="moveMarker"
        :zoom="defaultZoom"
      >
        <!-- Controller -->
        <mgl-navigation-control position="top-right"/>

        <!-- Draggable marker -->
        <mgl-marker
          v-if="value.longitude"
          :coordinates="[value.longitude, value.latitude]"
          draggable
          color="#e91e63"
          anchor="bottom"
          @dragend="onDragEnd"
        />
      </mgl-map>
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
import Mapbox from 'mapbox-gl'
import OsmNominatim from '@/services/osm-nominatim'
import { MglMap, MglMarker, MglNavigationControl } from 'vue-mapbox'

export default {
  name: 'MapSelector',
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl
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
      default: 10
    },
    styleMap: {
      type: String,
      default: 'outdoor',
      required: false
    }
  },

  data () {
    return {
      accessToken: process.env.VUE_APP_OBLYK_MAPBOX_TOKEN,
      mapStyle: (this.styleMap === 'outdoor') ? 'mapbox://styles/clucien/ckingo0rf3thf17qovbo16s3b' : 'mapbox://styles/clucien/ckioe0rsh08q417p52hr76t8q',
      inDragEnDrop: false
    }
  },

  created () {
    this.mapbox = Mapbox
  },

  methods: {
    onMapLoaded: function (event) {
      const map = event.map
      map.setRenderWorldCopies(false)
      map.setCenter([
        this.defaultLongitude,
        this.defaultLatitude
      ])
    },

    moveMarker: function (event) {
      if (!this.inDragEnDrop) {
        this.value.latitude = event.mapboxEvent.lngLat.lat.toPrecision(6)
        this.value.longitude = event.mapboxEvent.lngLat.lng.toPrecision(6)
        this.addressDetail()
      } else {
        this.inDragEnDrop = false
      }
    },

    onDragEnd: function (event) {
      this.inDragEnDrop = true
      this.value.latitude = event.marker._lngLat.lat.toPrecision(6)
      this.value.longitude = event.marker._lngLat.lng.toPrecision(6)
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

  .mapboxgl-map {
    border-radius: 4px;

    .mapboxgl-canvas {
      cursor: crosshair;
    }
  }
}
</style>
