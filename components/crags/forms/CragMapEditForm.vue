<template>
  <div class="crag-edit-map-area">
    <v-card
      :loading="loadingGeoJson"
      class="crag-edit-map-card"
      width="400"
    >
      <v-list-item>
        <v-list-item-icon class="mr-3">
          <v-btn
            :to="crag.path"
            exact
            icon
          >
            <v-icon>
              {{ mdiArrowLeft }}
            </v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ crag.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('actions.editMapElements') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Helpers and Forms -->
      <div
        v-if="showHelpersAndForms"
        class="px-4"
      >
        <div v-if="!startEdit">
          <v-alert
            :dense="$vuetify.breakpoint.mobile"
            dismissible
            color="blue"
            text
            v-html="$t('components.crag.explainMapEditor')"
          />
          <div class="text-right">
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    {{ mdiMapMarkerPlus }}
                  </v-icon>
                  {{ $t('actions.add') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="startAddMarker('Park')">
                  <v-list-item-icon>
                    <v-icon>
                      {{ mdiParking }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ $t('actions.addPark') }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="startAddPolyline('Approach')">
                  <v-list-item-icon>
                    <v-icon>
                      {{ mdiWalk }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ $t('actions.addApproach') }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="startAddPolyline('RockBar')">
                  <v-list-item-icon>
                    <v-icon>
                      {{ mdiVectorPolyline }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ $t('actions.addRockBar') }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <!-- CRAG -->
        <v-card
          v-if="startEdit && editType === 'Crag'"
          class="border pa-2"
        >
          <v-card-title
            class="py-2"
          >
            {{ $t('components.crag.globalLocation') }}
            <v-spacer />
            <v-btn
              icon
              @click="reloadData(false)"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-alert
            :dense="$vuetify.breakpoint.mobile"
            color="blue"
            class="mb-0"
            text
            v-html="$t('components.crag.explainGlobalLocation')"
          />
          <div
            v-if="editableMarkerLocated"
            class="text-right mt-2"
          >
            <v-btn
              :loading="updateCrag"
              elevation="0"
              color="primary"
              @click="editCragLocation"
            >
              {{ $t('actions.edit') }}
            </v-btn>
          </div>
        </v-card>

        <!-- PARK -->
        <v-card
          v-if="startEdit && editType === 'Park'"
          class="border"
          :loading="parkLoading"
        >
          <v-card-title
            class="py-2"
          >
            {{ $t('models.park.title') }}
            <v-spacer />
            <v-btn
              icon
              @click="reloadData(false)"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-card-title>
          <div class="mx-2">
            <v-alert
              :dense="$vuetify.breakpoint.mobile"
              color="blue"
              class="mb-2"
              text
              v-html="$t('components.crag.explainPark')"
            />
            <div
              v-if="editableMarkerLocated && !parkLoading"
              class="mt-4 mb-2"
            >
              <park-form
                :submit-methode="submitMethod"
                :crag="crag"
                :map="false"
                :back-btn="false"
                :callback="reloadData"
                :park="parkData"
              />
            </div>
          </div>
        </v-card>

        <!-- APPROACH -->
        <v-card
          v-if="startEdit && editType === 'Approach'"
          class="border"
          :loading="approachLoading"
        >
          <v-card-title class="py-2">
            {{ $t('models.approach.title') }}
            <v-spacer />
            <v-btn
              icon
              @click="reloadData(false)"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-card-title>
          <div class="mx-2">
            <v-alert
              :dense="$vuetify.breakpoint.mobile"
              color="blue"
              class="mb-2"
              text
              v-html="$t('components.crag.explainApproach')"
            />
            <div
              v-if="editablePolylineLocated && !approachLoading"
              class="mt-4 mb-2"
            >
              <approach-from
                :submit-methode="submitMethod"
                :crag="crag"
                :map="false"
                :back-btn="false"
                :callback="reloadData"
                :approach="approachData"
              />
            </div>
          </div>
        </v-card>

        <!-- ROCK BAR -->
        <v-card
          v-if="startEdit && editType === 'RockBar'"
          class="border"
          :loading="rockBarLoading"
        >
          <v-card-title class="py-2">
            {{ $t('models.rockBar.title') }}
            <v-spacer />
            <v-btn
              icon
              @click="reloadData(false)"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-card-title>
          <div class="mx-2">
            <v-alert
              :dense="$vuetify.breakpoint.mobile"
              color="blue"
              class="mb-2"
              text
              v-html="$t('components.crag.explainRockBar')"
            />
            <div
              v-if="editablePolylineLocated && !rockBarLoading"
              class="mt-4 mb-2"
            >
              <v-row class="mb-1">
                <v-col cols="5" class="text-center">
                  <div class="pt-1">
                    <v-img src="/images/rock-bar-orientation-helper.png" contain height="15px" width="100%" />
                  </div>
                  <small class="text--disabled">
                    {{ $t('components.crag.cragFoot') }}
                  </small>
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    outlined
                    text
                    @click="reversePolyline"
                  >
                    <v-icon left size="25">
                      {{ oblykReverseRockBar }}
                    </v-icon>
                    {{ $t('actions.reverse') }}
                  </v-btn>
                </v-col>
              </v-row>
              <rock-bar-from
                :submit-methode="submitMethod"
                :crag="crag"
                :back-btn="false"
                :callback="reloadData"
                :rock-bar="rockBarData"
              />
            </div>
          </div>
        </v-card>
      </div>
      <div
        class="text-center py-1 collapse-card"
        @click="showHelpersAndForms = !showHelpersAndForms"
      >
        <v-icon :class="showHelpersAndForms ? '' : '--animate-arrow'">
          {{ showHelpersAndForms ? mdiChevronUp : mdiChevronDown }}
        </v-icon>
      </div>
    </v-card>

    <!-- Editable map -->
    <client-only>
      <editable-map
        ref="map"
        editable
        :zoom="16"
        :center="[crag.latitude, crag.longitude]"
        :options="{ zoomControl: false }"
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
          ref="editable-marker-line"
          :fill-opacity="0"
          :editable="true"
          :weight="2"
          dash-array="5px"
        />
      </editable-map>
    </client-only>
  </div>
</template>

<script>
import {
  mdiMapMarkerPlus,
  mdiParking,
  mdiWalk,
  mdiVectorPolyline,
  mdiArrowRight,
  mdiClose,
  mdiArrowLeft,
  mdiChevronUp,
  mdiChevronDown
} from '@mdi/js'
import L from 'leaflet'
import 'leaflet-textpath/leaflet.textpath'
import 'leaflet/dist/leaflet.css'
import { LControl, LControlZoom, LGeoJson, LTileLayer } from 'vue2-leaflet'
import { EditableMap, EditablePolyline } from 'vue2-leaflet-editable'
import { oblykReverseRockBar } from '~/assets/oblyk-icons'
import LeafletLayerSelector from '~/components/maps/leafletControls/LeafletLayerSelector.vue'
import CragApi from '~/services/oblyk-api/CragApi'
import { MapMarkerHelpers } from '~/mixins/MapMarkerHelpers'
import { MapPopupHelpers } from '~/mixins/MapPopupHelpers'
import ParkForm from '~/components/parks/forms/ParkForm.vue'
import ParkApi from '~/services/oblyk-api/ParkApi'
import { MapDrawingHelpers } from '~/mixins/MapDrawingHelpers'
import ApproachFrom from '~/components/approaches/forms/ApproachForm.vue'
import ApproachApi from '~/services/oblyk-api/ApproachApi'
import RockBarFrom from '~/components/rockBars/forms/RockBarForm.vue'
import RockBarApi from '~/services/oblyk-api/RockBarApi'

export default {
  name: 'CragMapEditForm',
  components: {
    RockBarFrom,
    ApproachFrom,
    ParkForm,
    LeafletLayerSelector,
    EditableMap,
    EditablePolyline,
    LTileLayer,
    LControl,
    LControlZoom,
    LGeoJson
  },
  mixins: [MapMarkerHelpers, MapPopupHelpers, MapDrawingHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showHelpersAndForms: true,
      loadingGeoJson: true,
      geoJsons: [],
      savedGeoJsons: [],
      layerIndex: 0,
      map: null,
      editablePolyline: null,
      editablePolylineLocated: false,
      editableMarker: null,
      editableMarkerLocated: false,
      newLatLng: null,
      newPolyline: null,
      startEdit: false,
      editType: null,
      submitMethod: null,
      currentEditableObject: null,
      layers: [
        {
          name: 'Mapbox Outdoor',
          url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_TERRAIN_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Eseri Satelite',
          url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_SATELLITE_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
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
      editableIcon: L.icon({
        iconUrl: '/markers/new-marker.png',
        iconSize: [23, 30],
        iconAnchor: [11.5, 30],
        popupAnchor: [0, 0]
      }),

      updateCrag: false,

      parkLoading: true,
      parkDataRecovered: null,

      approachLoading: true,
      approachDataRecovered: null,

      rockBarLoading: true,
      rockBarDataRecovered: null,

      mdiMapMarkerPlus,
      mdiParking,
      mdiWalk,
      mdiVectorPolyline,
      mdiArrowRight,
      mdiClose,
      mdiArrowLeft,
      mdiChevronUp,
      mdiChevronDown,
      oblykReverseRockBar
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    },

    parkData () {
      return {
        id: this.parkDataRecovered?.id,
        description: this.parkDataRecovered?.description,
        latitude: this.newLatLng?.lat,
        longitude: this.newLatLng?.lng
      }
    },

    approachData () {
      return {
        id: this.approachDataRecovered?.id,
        description: this.approachDataRecovered?.description,
        approach_type: this.approachDataRecovered?.approach_type,
        polyline: this.newPolyline
      }
    },

    rockBarData () {
      return {
        id: this.rockBarDataRecovered?.id,
        description: this.rockBarDataRecovered?.description,
        crag_sector_id: this.rockBarDataRecovered?.crag_sector_id,
        polyline: this.newPolyline
      }
    }
  },

  mounted () {
    this.getCragGeoJson()
  },

  methods: {
    getCragGeoJson () {
      this.loadingGeoJson = true
      new CragApi(this.$axios, this.$auth)
        .geoJsonAround(this.crag.id)
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          this.loadingGeoJson = false
        })
    },

    onReadyMap () {
      this.map = this.$refs.map.mapObject
    },

    pointToLayerFunction () {
      return (feature, latLng) => {
        let opacity = 1
        let interactive = true
        if (feature.properties.type === 'Crag' && feature.properties.id !== this.crag.id) {
          opacity = 0.5
          interactive = false
        }
        return L.marker(latLng, {
          icon: L.icon(this.markers[feature.properties.icon]),
          opacity,
          interactive
        })
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        if (feature.properties.type === 'Park' || feature.properties.type === 'Crag') {
          layer.on('click', () => { this.startEditMarker(layer, feature) })
        }
        if (feature.properties.type === 'Approach' || feature.properties.type === 'RockBar') {
          layer.on('click', () => { this.startEditPolyline(layer, feature) })
        }
        if (feature.properties.type === 'RockBar') {
          layer.options.color = '#616161'
          layer.options.weight = 7
          layer.setText('‣ ', { offset: -1, repeat: true, attributes: { fill: '#616161', 'font-size': '22px', rotate: 90 }, below: true })
        }
        if (feature.properties.type === 'Approach') {
          layer.options.color = '#795548'
          layer.options.dashArray = [10, 10]
          layer.options.weight = 6
        }
      }
    },

    saveGeoJson () {
      this.savedGeoJsons = JSON.parse(JSON.stringify(this.geoJsons))
    },

    autoCollapse () {
      if (this.$vuetify.breakpoint.mobile) {
        this.showHelpersAndForms = false
      }
    },

    reloadData (getGeoJson = true) {
      this.map.editTools.commitDrawing()
      this.map.editTools.stopDrawing()
      if (this.editableMarker !== null) {
        this.editableMarker.disableEdit()
        this.editableMarker.remove()
      }
      this.editablePolyline = null
      this.editablePolylineLocated = false
      this.editableMarker = null
      this.editableMarkerLocated = false
      this.newLatLng = null
      this.newPolyline = null
      this.startEdit = false
      this.editType = null
      this.submitMethod = null

      // Park
      this.parkLoading = true
      if (this.parkDataRecovered) {
        this.parkDataRecovered.description = null
        this.parkDataRecovered.id = null
      }

      // Approach
      this.approachLoading = true
      if (this.approachDataRecovered) {
        this.approachDataRecovered.description = null
        this.approachDataRecovered.approach_type = null
        this.approachDataRecovered.id = null
      }
      if (getGeoJson) {
        this.getCragGeoJson()
      } else {
        this.geoJsons = JSON.parse(JSON.stringify(this.savedGeoJsons))
      }
    },

    falseModelLoader () {
      this.parkLoading = false
      this.approachLoading = false
      this.rockBarLoading = false
      this.updateCrag = false
    },

    // MARKER
    startAddMarker (type) {
      if (this.startEdit) { return false }

      this.autoCollapse()
      this.saveGeoJson()
      this.startEdit = true
      this.editType = type
      this.submitMethod = 'post'
      this.falseModelLoader()
      this.editableMarker = this.map.editTools.startMarker(null, { icon: this.editableIcon })
      this.editableMarker.on('editable:drawing:commit', () => { this.editableMarkerMove(this.editableMarker) })
      this.editableMarker.on('editable:dragend', () => { this.editableMarkerMove(this.editableMarker) })
    },

    startEditMarker (marker, feature) {
      if (this.startEdit) { return false }

      this.autoCollapse()
      this.saveGeoJson()
      if (feature.properties.type === 'Park') {
        this.getPark(feature.properties.id)
      }
      marker.setIcon(this.editableIcon)
      marker.enableEdit()
      this.submitMethod = 'put'
      this.startEdit = true
      this.editType = feature.properties.type
      marker.on('editable:drawing:commit', () => { this.editableMarkerMove(marker) })
      marker.on('editable:dragend', () => { this.editableMarkerMove(marker) })
    },

    editableMarkerMove (marker) {
      if (marker && marker?._latlng?.lat !== null) {
        this.newLatLng = marker._latlng
        this.editableMarkerLocated = true
      }
    },

    // POLYLINE
    startAddPolyline (type) {
      if (this.startEdit) { return false }

      this.autoCollapse()
      this.saveGeoJson()
      this.startEdit = true
      this.editType = type
      this.submitMethod = 'post'
      this.falseModelLoader()
      this.editableMarker = this.map.editTools.startPolyline(null, { color: 'rgb(255, 85, 153)' })
      if (type === 'RockBar') {
        this.editableMarker.setText('‣ ', { offset: -1, repeat: true, attributes: { fill: 'rgb(255, 85, 153)', 'font-size': '22px', rotate: 90 }, below: true })
      }
      this.editableMarker.on('editable:drawing:commit', () => { this.editablePolylineMove(this.editableMarker) })
      this.editableMarker.on('editable:drawing:clicked', () => { this.editablePolylineMove(this.editableMarker) })
    },

    startEditPolyline (polyline, feature) {
      if (this.startEdit) { return false }

      this.autoCollapse()
      this.saveGeoJson()
      if (feature.properties.type === 'Approach') { this.getApproach(feature.properties.id) }
      if (feature.properties.type === 'RockBar') { this.getRockBar(feature.properties.id) }

      polyline.setStyle({ color: 'rgb(255, 85, 153)' })
      polyline.enableEdit()
      this.submitMethod = 'put'
      this.startEdit = true
      this.editType = feature.properties.type
      polyline.on('editable:editing', () => { this.editablePolylineMove(polyline) })
      this.editableMarker = polyline
    },

    editablePolylineMove (polyline) {
      if (polyline && polyline?._latlngs !== null) {
        this.newPolyline = this.latLgnToArray([polyline._latlngs])
        this.editablePolylineLocated = true
      }
    },

    reversePolyline () {
      this.editableMarker.editor.disable()
      this.editableMarker.setLatLngs(this.editableMarker.getLatLngs().reverse())
      this.editableMarker.enableEdit()
      if (this.submitMethod === 'post') {
        this.editableMarker.editor.continueBackward()
      }
      this.editablePolylineMove(this.editableMarker)
    },

    // UPDATE CRAG LOCATION
    editCragLocation () {
      this.updateCrag = true
      new CragApi(this.$axios, this.$auth)
        .update({
          id: this.crag.id,
          latitude: this.newLatLng.lat,
          longitude: this.newLatLng.lng
        })
        .then(() => {
          this.reloadData()
        })
        .finally(() => {
          this.updateCrag = false
        })
    },

    // GETTERS
    getPark (id) {
      this.parkLoading = true
      new ParkApi(this.$axios, this.$auth)
        .find(this.crag.id, id)
        .then((resp) => {
          this.parkDataRecovered ||= {}
          this.parkDataRecovered.id = resp.data.id
          this.parkDataRecovered.description = resp.data.description
          this.newLatLng = { lat: resp.data.latitude, lng: resp.data.longitude }
          this.editableMarkerLocated = true
        })
        .finally(() => {
          this.parkLoading = false
        })
    },

    getApproach (id) {
      this.approachLoading = true
      new ApproachApi(this.$axios, this.$auth)
        .find(this.crag.id, id)
        .then((resp) => {
          this.approachDataRecovered ||= {}
          this.approachDataRecovered.id = resp.data.id
          this.approachDataRecovered.description = resp.data.description
          this.approachDataRecovered.approach_type = resp.data.approach_type
          this.newPolyline = resp.data.polyline
          this.editablePolylineLocated = true
        })
        .finally(() => {
          this.approachLoading = false
        })
    },

    getRockBar (id) {
      this.rockBarLoading = true
      new RockBarApi(this.$axios, this.$auth)
        .find(this.crag.id, id)
        .then((resp) => {
          this.rockBarDataRecovered ||= {}
          this.rockBarDataRecovered.id = resp.data.id
          this.rockBarDataRecovered.crag_sector_id = resp.data.crag_sector_id
          this.newPolyline = resp.data.polyline
          this.editablePolylineLocated = true
        })
        .finally(() => {
          this.rockBarLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.crag-edit-map-area {
  height: 100%;
  width: 100%;
  position: relative;
  .crag-edit-map-card {
    z-index: 6;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 450px;
    max-width: calc(100% - 20px);
  }
  .collapse-card {
    transition: background-color 0.3s;
    cursor: pointer;
    .--animate-arrow {
      animation-name: open-card-animation;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: normal;
      animation-play-state: running;
    }
  }
}
.theme--light {
  .crag-edit-map-area {
    .collapse-card {
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.theme--dark {
  .crag-edit-map-area {
    .collapse-card {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

@keyframes open-card-animation {
  0% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
