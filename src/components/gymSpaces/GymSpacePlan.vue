<template>
  <div
    v-resize="setWidthMap"
    ref="map-col-box"
  >
    <div class="gym-space-map" ref="map-area">
      <spinner v-if="reloadingData" />

      <editable-map
        v-if="!reloadingData"
        editable
        ref="map"
        :min-zoom="minZoom"
        :crs="crs"
        :options="{ zoomControl: false }"
        style="height: 100%; width: 100%"
        @ready="onReadyMap()"
      >
        <l-image-overlay
          :url="url"
          :bounds="bounds"
        />
        <l-control-zoom position="topright"></l-control-zoom>

        <editable-polygon
          v-for="sector in sectorPolygons"
          :key="sector.id"
          :fill-opacity="0"
          :weight="2"
          dash-array="5px"
          :lat-lngs="sector.jsonPolygon"
          @click="filterBySector(sector.id)"
          :ref="`polygon-sector-${sector.id}`"
        />
      </editable-map>
    </div>
  </div>
</template>
<script>
import { CRS } from 'leaflet'
import { LImageOverlay, LControlZoom } from 'vue2-leaflet'
import { EditableMap, EditablePolygon } from 'vue2-leaflet-editable'
import GymSectorApi from '@/services/oblyk-api/GymSectorApi'

import 'leaflet/dist/leaflet.css'
import { MapDrawingHelpers } from '@/mixins/MapDrawingHelpers'
import Spinner from '@/components/layouts/Spiner'
import GymSpace from '@/models/GymSpace'

export default {
  name: 'GymSpacePlan',
  mixins: [MapDrawingHelpers],
  components: {
    Spinner,
    EditableMap,
    EditablePolygon,
    LImageOverlay,
    LControlZoom
  },

  props: {
    gymSpace: Object
  },

  data () {
    return {
      reloadingData: false,
      map: null,
      minZoom: -2,
      crs: CRS.Simple,
      drawingSectorPolygon: null,
      editingSectorId: null,
      isNewPolygon: false,
      savingPolygon: false
    }
  },

  computed: {
    url: function () {
      return this.gymSpace.planUrl()
    },

    sectorPolygons: function () {
      const sectorPolygon = []
      for (const sector of this.gymSpace.GymSectors) {
        if (sector.polygon) sectorPolygon.push(sector)
      }
      return sectorPolygon
    },

    bounds: function () {
      return [[0, 0], [this.gymSpace.scheme_height / 6, this.gymSpace.scheme_width / 6]]
    }
  },

  mounted () {
    this.$root.$on('startEditSectorPolygon', (gymSectorId) => {
      this.startEditSectorPolygon(gymSectorId)
    })
    this.$root.$on('activeSector', (gymSectorId) => {
      this.activeSector(gymSectorId)
    })
    this.$root.$on('stopEditingSectorPolygon', () => {
      this.stopEditingSectorPolygon()
    })
    this.$root.$on('setWidthMap', () => {
      this.setWidthMap()
    })
    this.setWidthMap()
  },

  methods: {
    onReadyMap: function () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setWidthMap: function () {
      const width = this.$refs['map-col-box'].offsetWidth
      if (width === 0) {
        this.$refs['map-area'].style.width = '100%'
      } else {
        this.$refs['map-area'].style.width = `${this.$refs['map-col-box'].offsetWidth - 10}px`
      }
    },

    setMapView: function () {
      this.map.setView([this.gymSpace.scheme_height / 12, this.gymSpace.scheme_width / 12], 1)
    },

    startEditSectorPolygon: function (gymSectorId) {
      const polygonSector = this.$refs[`polygon-sector-${gymSectorId}`]
      this.editingSectorId = gymSectorId

      if (polygonSector) {
        polygonSector[0].enableEdit()
        this.drawingSectorPolygon = polygonSector[0].mapObject
        this.isNewPolygon = false
      } else {
        this.drawingSectorPolygon = this.map.editTools.startPolygon()
        this.isNewPolygon = true
      }
    },

    stopEditingSectorPolygon: function () {
      this.map.editTools.commitDrawing()
      this.map.editTools.stopDrawing()
      this.drawingSectorPolygon.disableEdit()
      this.saveSectorPolygon(this.drawingSectorPolygon._latlngs)
    },

    clearSectorSelection: function () {
      for (const ref in this.$refs) {
        if (ref.includes('polygon-sector-')) {
          const polygon = this.$refs[ref][0]
          if (polygon !== undefined) {
            polygon.setWeight(2)
            polygon.setFillOpacity(0)
            polygon.setDashArray('5px')
          }
        }
      }
    },

    activeSector: function (gymSectorId) {
      this.clearSectorSelection()
      if (this.$refs[`polygon-sector-${gymSectorId}`]) {
        const polygonSector = this.$refs[`polygon-sector-${gymSectorId}`][0]
        if (polygonSector !== undefined) {
          polygonSector.setFillOpacity(0.5)
          polygonSector.setWeight(3)
          polygonSector.setDashArray('none')
        }
      }
    },

    saveSectorPolygon: function (polygon) {
      if (this.savingPolygon) return

      this.savingPolygon = true
      const data = {
        gym_id: this.gymSpace.gym.id,
        gym_space_id: this.gymSpace.id,
        id: this.editingSectorId,
        polygon: JSON.stringify(this.latLgnToArray(polygon))
      }
      if (this.isNewPolygon) this.reloadingData = true
      GymSectorApi
        .update(data)
        .then(() => {
          if (this.isNewPolygon) this.reloadGymSpaceData()
        })
        .catch(() => {
          this.reloadingData = false
        })
        .finally(() => {
          this.savingPolygon = false
        })
    },

    reloadGymSpaceData: function () {
      this.reloadingData = true
      new GymSpace()
        .find(
          this.gymSpace.gym.id,
          this.gymSpace.id
        )
        .then((resp) => {
          this.gymSpace = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.reloadingData = false
        })
    },

    filterBySector: function (sectorId) {
      this.$root.$emit('filtreBySector', sectorId)
      this.activeSector(sectorId)
    }
  }
}
</script>
<style lang="scss">
.gym-space-map {
  position: fixed;
  right: 0;
  top: 64px;
  width: calc(100vw - 765px);
  height: calc(100vh - 64px);
  .leaflet-container {
    background-color: #1e1e1e;
  }

  .leaflet-pane {
    z-index: 4;
  }

  .absolut-edit-btn {
    position: absolute;
    bottom: 5px;
    left: 5px;
  }
}
.theme--light {
  .gym-space-map {
    .leaflet-container {
      background-color: #f5f5f5;
    }
  }
}

.theme--dark {
  .gym-space-map {
    .leaflet-container {
      background-color: #1e1e1e;
    }
  }
}

@media only screen and (max-width: 700px) {
  .gym-space-map {
    top: 48px;
    height: calc(100vh - 88px);
  }
}
.leaflet-interactive {
  transition: fill-opacity 0.3s;
  &:hover {
    stroke-width: 3px;
    stroke-dasharray: none;
    fill-opacity: 0.2;
  }
  &.active {
    fill-opacity: 0.5;
    stroke-width: 3px;
    stroke-dasharray: none;
    fill: white;
    stroke: white;
  }
}
</style>
