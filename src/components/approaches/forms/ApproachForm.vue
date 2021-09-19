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
        outlined
        required
        v-model="data.description"
        :label="$t('models.cragSector.description')"
      />

      <p v-if="!isEditingForm()">
        {{ $t('components.approach.newPolylineExplain') }}
      </p>

      <p v-if="isEditingForm()">
        {{ $t('components.approach.editPolylineExplain') }}
      </p>

      <editable-map
        class="mt-5 approach-editable-map"
        editable
        ref="approachMap"
        :zoom="15"
        :center="[crag.latitude, crag.longitude]"
        :options="{ zoomControl: false }"
        style="height: 500px; width: 100%"
        @ready="onReadyMap()"
      >
        <l-control-zoom position="topright"></l-control-zoom>

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

        <editable-polyline
          v-if="approach"
          :fill-opacity="0"
          :editable="true"
          :weight="2"
          dash-array="5px"
          ref="approach-editable-line"
          :lat-lngs="approach.polyline"
        />
      </editable-map>

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import ApproachApi from '@/services/oblyk-api/ApproachApi'
import Spinner from '@/components/layouts/Spiner'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import { LControl, LControlZoom, LGeoJson, LTileLayer } from 'vue2-leaflet'
import { EditableMap, EditablePolyline } from 'vue2-leaflet-editable'
import L from 'leaflet'
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
    CloseForm,
    Spinner
  },
  mixins: [FormHelpers, MapMarkerHelpers, MapPopupHelpers],
  props: {
    crag: Object,
    approach: {
      type: Object,
      required: false
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

  mounted () {
    this.getGeoJsonAround()
  },

  methods: {
    onReadyMap: function () {
      this.approachMap = this.$refs.approachMap.mapObject
      if (!this.isEditingForm()) this.newApproachPolyline = this.approachMap.editTools.startPolyline()
    },

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

    submit: function () {
      this.submitOverlay = true

      if (this.isEditingForm()) {
        const polyline = this.$refs['approach-editable-line']
        this.data.polyline = this.latLngToArray(polyline.mapObject._latlngs)
      } else {
        this.data.polyline = this.latLngToArray(this.newApproachPolyline._latlngs)
      }

      const promise = (this.isEditingForm()) ? ApproachApi.update(this.data) : ApproachApi.create(this.data)
      promise
        .then(() => {
          this.$router.push(this.crag.path('maps'))
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'approach')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    latLngToArray: function (latLngs) {
      const latLngArray = []
      for (const latLng of latLngs) {
        latLngArray.push([latLng.lat, latLng.lng])
      }
      return latLngArray
    },

    getGeoJsonAround: function () {
      this.loadingGeoJson = true
      const approachId = (this.isEditingForm() ? this.approach.id : null)
      ApproachApi
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
