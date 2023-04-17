<template>
  <client-only>
    <div
      class="leaflet-map"
      :class="options.rounded ? 'rounded-leaflet' : ''"
    >
      <l-map
        ref="leafletMap"
        :zoom="zoom"
        :center="center"
        :options="{
          zoomControl: false,
          worldCopyJump: true,
          scrollWheelZoom: scrollWheelZoom
        }"
        @click="hideOpensControl"
        @move="savePosition"
        @zoom="saveZoom"
      >
        <!-- Zoom Control -->
        <l-control-zoom position="topright" />

        <!-- Layer Selector -->
        <l-control position="topright">
          <leaflet-layer-selector v-model="layerIndex" :map-style="mapStyle" />
        </l-control>

        <!-- Set center to localization -->
        <l-control position="topright">
          <leaflet-localization-center
            :set-map-view="setView"
          />
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

        <!-- GeoJson & Marker cluster if clustered -->
        <v-marker-cluster
          v-if="clustered"
          :options="{ disableClusteringAtZoom: 12 }"
        >
          <l-geo-json
            v-for="(geojson, index) in geoJsons"
            :key="`geosjon-${index}`"
            :geojson="geoJsons"
            :options="geoJsonOptions"
          />
        </v-marker-cluster>

        <!-- GeoJson & Marker cluster if not clustered -->
        <l-geo-json
          v-if="!clustered"
          :geojson="geoJsons"
          :options="geoJsonOptions"
        />

        <!-- Circle -->
        <l-circle
          v-if="circleProperties"
          :lat-lng="circleProperties.center"
          :radius="circleProperties.radius"
          :color="circleProperties.color || 'blue'"
          :dash-array="circleProperties.dashArray.toString() || null"
          :fill="circleProperties.fill || false"
          :fill-color="circleProperties.fillColor || 'blue'"
          :fill-opacity="circleProperties.fillOpacity || 0.2"
          :weight="circleProperties.weight || 3"
        />

        <!-- Locality users -->
        <l-circle
          v-for="(localityUser, localityUserIndex) in localityUsers"
          :key="`locality-user-index-${localityUserIndex}`"
          :lat-lng="[localityUser.locality.latitude, localityUser.locality.longitude]"
          :radius="localityUser.radius * 1000"
          color="rgb(49, 153, 78)"
          :fill="false"
          :interactive="false"
          :weight="1"
        />

        <l-marker
          v-if="showLocalization && IAmGeolocated"
          :lat-lng="myLatLng"
          :icon="myLocationIcon"
        >
          <l-tooltip>
            {{ $t('components.localization.IAmHere') }}
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </client-only>
</template>

<script>
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlZoom, LGeoJson, LControl, LCircle, LMarker, LTooltip } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import LeafletLegend from '@/components/maps/leafletControls/LeafletLegend'
import LeafletLocalizationCenter from '~/components/maps/leafletControls/LeafletLocalizationCenter'
import CragApi from '~/services/oblyk-api/CragApi'
import GymApi from '~/services/oblyk-api/GymApi'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import PlaceOfSaleApi from '~/services/oblyk-api/PlaceOfSaleApi'
import ParkApi from '~/services/oblyk-api/ParkApi'
import ApproachApi from '~/services/oblyk-api/ApproachApi'
import UserApi from '~/services/oblyk-api/UserApi'

export default {
  name: 'LeafletMap',

  components: {
    LeafletLocalizationCenter,
    LeafletLegend,
    LeafletLayerSelector,
    LMap,
    LCircle,
    LGeoJson,
    LControl,
    LControlZoom,
    LTileLayer,
    LMarker,
    LTooltip,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  mixins: [MapPopupHelpers, MapMarkerHelpers],

  props: {
    mapStyle: {
      type: String,
      default: null
    },
    geoJsons: {
      type: Object,
      default: null
    },
    trackLocation: {
      type: Boolean,
      default: true
    },
    zoomForce: {
      type: Number,
      default: null
    },
    latitudeForce: {
      type: [Number, String],
      default: null
    },
    longitudeForce: {
      type: [Number, String],
      default: null
    },
    scrollWheelZoom: {
      type: Boolean,
      default: true
    },
    clustered: {
      type: Boolean,
      default: true
    },
    circleProperties: {
      type: Object,
      default: null
    },
    showLocalization: {
      type: Boolean,
      default: true
    },
    localityUsers: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          department: {
            clickable: true
          },
          rounded: false
        }
      }
    }
  },

  data () {
    return {
      map: null,
      showLayersSelector: false,
      layerIndex: 0,
      zoom: this.zoomForce || parseFloat(localStorage.getItem('map-zoom') || '10'),
      center: L.latLng(
        this.latitudeForce || parseFloat(localStorage.getItem('map-latitude') || '45'),
        this.longitudeForce || parseFloat(localStorage.getItem('map-longitude') || '4.5')
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
        },
        {
          name: 'CyclOSM',
          url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.cyclosm.org">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        }
      ],
      geoJsonOptions: {
        onEachFeature: this.onEachFeatureFunction(),
        pointToLayer: this.pointToLayerFunction()
      },
      myLocationIcon: icon(
        {
          iconUrl: '/markers/i-am-here.png', iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -7]
        }
      )
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    },

    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    },

    myLatLng () {
      return [this.$store.state.geolocation.latitude, this.$store.state.geolocation.longitude]
    }
  },

  mounted () {
    this.$root.$on('fitMapOnGeoJsonBounds', () => {
      this.fitGeoJsonBounds()
    })
  },

  beforeDestroy () {
    this.$root.$off('fitMapOnGeoJsonBounds')
  },

  beforeMount () {
    this.layerIndex = 0
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        if (feature.properties.icon === 'locality') {
          return L.marker(latLng, { icon: L.divIcon(this.localityMarker(feature.properties)) })
        } else {
          return L.marker(latLng, { icon: L.icon(this.markers[feature.properties.icon]) })
        }
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        if (feature.properties.type === 'Department') {
          layer.options.color = 'rgb(234, 141, 125)'
          layer.options.weight = 2
          if (this.options.department.clickable) {
            layer.options.fillColor = 'rgb(255, 255, 255)'
            layer.on('click', () => {
              this.$router.push(`/escalade-en/${feature.properties.country_slug_name}/${feature.properties.department_number}/${feature.properties.slug_name}`)
            })
          } else {
            layer.options.fill = false
            layer.options.interactive = false
          }
        } else if (feature.properties.type === 'Locality') {
          layer.on('click', () => {
            this.$router.push({ path: this.$route.path, query: { locality: feature.properties.id } })
          })
        } else {
          layer.on('click', () => { this.buildPopup(layer, feature.properties) })
        }
      }
    },

    hideOpensControl () {
      this.$root.$emit('hideLeafletMapLayerSelector')
      this.$root.$emit('hideLeafletMapLegend')
    },

    savePosition () {
      if (!this.trackLocation) { return }

      const center = this.$refs.leafletMap.mapObject.getCenter()
      localStorage.setItem('map-latitude', center.lat)
      localStorage.setItem('map-longitude', center.lng)
    },

    saveZoom () {
      if (!this.trackLocation) { return }

      const zoom = this.$refs.leafletMap.mapObject.getZoom()
      localStorage.setItem('map-zoom', zoom)
    },

    fitGeoJsonBounds () {
      const bounds = L.geoJson(this.geoJsons).getBounds()
      this.$refs.leafletMap.mapObject.fitBounds(bounds)
    },

    setView (options) {
      this.$refs.leafletMap.mapObject.setView([options.latitude, options.longitude], options.zoom)
    },

    buildPopup (marker, properties) {
      marker.unbindPopup()
      marker.bindPopup(`<div><p class="text-center pa-3 mb-0 mt-0">${this.$t('common.loading')}</p></div>`)
      marker.togglePopup()
      this
        .getData(properties)
        .then((resp) => {
          marker.setPopupContent(this.getHtmlPopup(properties.type, resp))
        })
    },

    getData (properties) {
      let apiService = null
      let primaryId = null
      let secondaryId = null

      // Select right api service
      if (properties.type === 'Crag') {
        primaryId = properties.id
        apiService = new CragApi(this.$axios, this.$auth)
      } else if (properties.type === 'Gym') {
        primaryId = properties.id
        apiService = new GymApi(this.$axios, this.$auth)
      } else if (properties.type === 'CragSector') {
        primaryId = properties.id
        apiService = new CragSectorApi(this.$axios, this.$auth)
      } else if (properties.type === 'PlaceOfSale') {
        primaryId = properties.guide_book_paper_id
        secondaryId = properties.id
        apiService = new PlaceOfSaleApi(this.$axios, this.$auth)
      } else if (properties.type === 'Park') {
        primaryId = properties.crag_id
        secondaryId = properties.id
        apiService = new ParkApi(this.$axios, this.$auth)
      } else if (properties.type === 'Approach') {
        primaryId = properties.crag_id
        secondaryId = properties.id
        apiService = new ApproachApi(this.$axios, this.$auth)
      } else if (properties.type === 'PartnerUser') {
        primaryId = properties.uuid
        apiService = new UserApi(this.$axios, this.$auth)
      } else {
        return false
      }

      // Get data
      return new Promise((resolve, reject) => {
        apiService
          .find(primaryId, secondaryId)
          .then((resp) => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="scss">
@import "assets/leaflet-marker-cluster";
.leaflet-map {
  height: 100%;
  width: 100%;
  &.rounded-leaflet {
    .leaflet-container {
      border-radius: 15px;
    }
  }
}
.leaflet-marker-icon[src="/markers/i-am-here.png"] {
  animation: i-am-here-pulse-animation 2s infinite;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px rgba(42, 127, 255, 1);
  z-index: 500 !important;
}
.leaflet-popup {
  .map-popup-cover {
    background-color: rgb(240, 240, 240);
    border-radius: 4px 4px 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 300px;
    height: 150px;
  }
  .map-popup-information-table {
    width: 300px;
    color: black;
    th {
      width: 10px;
      text-align: right;
      white-space: nowrap;
      padding-right: 5px;
      padding-left: 5px;
    }
    .gym-map-title {
      font-weight: bold;
      padding: 10px;
      font-size: 1.2em;
    }
    cite {
      color: #808080;
    }
  }
  .map-popup-link-area {
    text-align: right;
    margin-top: 5px;
    padding: 7px 10px 7px 7px;
    border-top-style: solid;
    border-top-color: rgb(230,230,230);
    border-width: 1px;
    button {
      color: #1e88e5;
      font-weight: bold;
      text-transform: uppercase;
      text-decoration: none;
    }
  }

  .leaflet-popup-content-wrapper {
    border-radius: 4px;
    padding: 0;
  }

  .leaflet-popup-content {
    margin: 0;
  }

  .map-popup-cover {
    width: 100%;
    position: relative;
    .user-map-popup-name-and-avatar {
      position: absolute;
      bottom: 0;
      width: 300px;
      padding-left: 5px;
      padding-bottom: 5px;
      .user-map-popup-avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-map-popup-name {
        margin-left: 5px;
        display: inline-block;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        margin-top: 10px;
        vertical-align: top;
        background-color: rgba(0,0,0,0.8);
      }
    }
  }
  .map-popup-information-table {
    .map-popup-information-bio {
      padding-right: 8px;
      padding-left: 8px;
    }
  }
  .user-map-popup-last-activity-at {
    text-align: right;
    margin: 0 !important;
    padding-right: 8px;
  }
}
.user-partner-map-marker {
  .user-partner-map-marker-avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-partner-map-marker-caret {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: -5px;
    height: 10px;
  }
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
@keyframes i-am-here-pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(42, 127, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(42, 127, 255, 0);
  }
}
</style>
