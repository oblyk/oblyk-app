<template>
  <div class="map">
    <mgl-map
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      @load="onMapLoaded"
    >

      <!-- Controller -->
      <mgl-navigation-control position="top-right" />

      <!-- Crags markers -->
      <mgl-marker v-for="crag in crags" :key="crag.id"
        :coordinates="[crag.localization.longitude, crag.localization.latitude]"
        color="#03a9f4"
      >
        <mgl-popup>
          <crag-map-popup :crag-data="crag" />
        </mgl-popup>
      </mgl-marker>

      <!-- Gyms markers -->
      <mgl-marker v-for="gym in gyms" :key="gym.id"
                  :coordinates="[gym.longitude, gym.latitude]"
                  color="#9c27b0"
      >
        <mgl-popup>
          <gym-map-popup :gym-data="gym" />
        </mgl-popup>
      </mgl-marker>
    </mgl-map>
  </div>
</template>
<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox'
import CragMapPopup from '@/components/maps/CragMapPopup'
import GymMapPopup from '@/components/maps/GymMapPopup'

export default {
  name: 'Map',
  components: {
    GymMapPopup,
    CragMapPopup,
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglPopup
  },
  props: {
    mapStyleType: {
      type: String,
      default: 'outdoor',
      required: false
    },
    crags: {
      type: Array,
      required: false
    },
    gyms: {
      type: Array,
      required: false
    }
  },

  created () {
    this.mapbox = Mapbox
  },

  data () {
    return {
      accessToken: process.env.VUE_APP_OBLYK_MAPBOX_TOKEN,
      mapStyle: 'mapbox://styles/clucien/ckingo0rf3thf17qovbo16s3b'
    }
  },

  beforeMount () {
    if (this.mapStyleType === 'outdoor') {
      this.mapStyle = 'mapbox://styles/clucien/ckingo0rf3thf17qovbo16s3b'
    } else if (this.mapStyleType === 'street') {
      this.mapStyle = 'mapbox://styles/clucien/ckioe0rsh08q417p52hr76t8q'
    }
  },

  methods: {
    onMapLoaded: function (event) {
      const map = event.map
      map.setRenderWorldCopies(false)
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })
    }
  }
}
</script>
<style lang="scss">
#map, .map {
  width: 100%;
  height: 100%;
}
.mapboxgl-popup {
  max-width: 350px !important;
}
.mapboxgl-popup-content {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
</style>
