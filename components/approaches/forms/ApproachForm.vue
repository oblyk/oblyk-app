<template>
  <div>
    <spinner v-if="loadingGeoJson" />

    <v-form
      v-if="!loadingGeoJson"
      @submit.prevent="submit()"
    >
      <approach-type-input
        v-model="data.approach_type"
      />

      <v-textarea
        v-model="data.description"
        outlined
        required
        hide-details
        :label="$t('models.cragSector.description')"
      />

      <div v-if="map">
        <p v-if="!isEditingForm()">
          {{ $t('components.approach.newPolylineExplain') }}
        </p>

        <p v-if="isEditingForm()">
          {{ $t('components.approach.editPolylineExplain') }}
        </p>

        <client-only>
          <editable-map
            ref="approachMap"
            class="mt-5 approach-editable-map"
            editable
            :zoom="15"
            :center="[crag.latitude, crag.longitude]"
            :options="{ zoomControl: false }"
            style="height: 500px; width: 100%"
            @ready="onReadyMap()"
          >
            <l-control-zoom position="topright" />

            <!-- Layer Selector -->
            <l-control position="topright">
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

            <editable-polyline
              v-if="approach"
              ref="approach-editable-line"
              :fill-opacity="0"
              :editable="true"
              :weight="2"
              dash-array="5px"
              :lat-lngs="approach.polyline"
            />
          </editable-map>
        </client-only>
      </div>

      <submit-form
        class="mt-2"
        :rounded-overlay="true"
        :go-back-btn="backBtn"
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import L from 'leaflet'
import { LControl, LControlZoom, LGeoJson, LTileLayer } from 'vue2-leaflet'
import { EditableMap, EditablePolyline } from 'vue2-leaflet-editable'
import { FormHelpers } from '@/mixins/FormHelpers'
import ApproachApi from '@/services/oblyk-api/ApproachApi'
import Spinner from '@/components/layouts/Spiner'
import SubmitForm from '@/components/forms/SubmitForm'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import 'leaflet/dist/leaflet.css'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'
import ApproachTypeInput from '@/components/forms/ApproachTypeInput'

export default {
  name: 'ApproachFrom',
  components: {
    ApproachTypeInput,
    EditableMap,
    EditablePolyline,
    LeafletLayerSelector,
    LTileLayer,
    LControl,
    LControlZoom,
    LGeoJson,
    SubmitForm,
    Spinner
  },
  mixins: [FormHelpers, MapMarkerHelpers, MapPopupHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    },
    approach: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    map: {
      type: Boolean,
      default: true
    },
    backBtn: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      loadingGeoJson: true,
      geoJsons: [],
      newApproachPolyline: null,
      data: {
        id: (this.approach || {}).id,
        description: (this.approach || {}).description,
        polyline: (this.approach || {}).polyline,
        approach_type: (this.approach || {}).approach_type,
        crag_id: (this.approach || {}).crag_id || this.crag.id
      },
      layerIndex: 0,
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
      }
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    }
  },

  watch: {
    'approach.polyline' () {
      this.data.polyline = this.approach.polyline
    }
  },

  mounted () {
    if (this.map) {
      this.getGeoJsonAround()
    } else {
      this.loadingGeoJson = false
    }
  },

  methods: {
    onReadyMap () {
      this.approachMap = this.$refs.approachMap.mapObject
      if (!this.isEditingForm()) { this.newApproachPolyline = this.approachMap.editTools.startPolyline() }
    },

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

    submit () {
      this.submitOverlay = true

      if (this.map) {
        if (this.isEditingForm()) {
          const polyline = this.$refs['approach-editable-line']
          this.data.polyline = this.latLngToArray(polyline.mapObject._latlngs)
        } else {
          this.data.polyline = this.latLngToArray(this.newApproachPolyline._latlngs)
        }
      }

      const promise = (this.isEditingForm()) ? new ApproachApi(this.$axios, this.$auth).update(this.data) : new ApproachApi(this.$axios, this.$auth).create(this.data)
      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.crag.path}/maps`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'approach')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    latLngToArray (latLngs) {
      const latLngArray = []
      for (const latLng of latLngs) {
        latLngArray.push([latLng.lat, latLng.lng])
      }
      return latLngArray
    },

    getGeoJsonAround () {
      this.loadingGeoJson = true
      const approachId = (this.isEditingForm() ? this.approach.id : null)
      new ApproachApi(this.$axios, this.$auth)
        .geoJsonAround(
          this.data.crag_id,
          approachId
        )
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          this.loadingGeoJson = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.approach-editable-map {
  border-radius: 4px;
}
</style>
