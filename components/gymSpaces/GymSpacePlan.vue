<template>
  <div
    ref="map-col-box"
    v-resize="setWidthMap"
  >
    <div ref="map-area" class="gym-space-map">
      <spinner v-if="reloadingData" />

      <editable-map
        v-if="!reloadingData"
        ref="map"
        editable
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
        <l-control-zoom position="topright" />

        <editable-polygon
          v-for="(sector, sectorIndex) in sectorPolygons"
          :key="`polygon-sector-${sectorIndex}`"
          :ref="`polygon-sector-${sector.id}`"
          :fill-opacity="0"
          :weight="2"
          dash-array="5px"
          :lat-lngs="sector.jsonPolygon"
          @click="filterBySector(sector.id)"
        />
      </editable-map>
    </div>
  </div>
</template>

<script>
import { CRS } from 'leaflet'
import { LImageOverlay, LControlZoom } from 'vue2-leaflet'
import { EditableMap, EditablePolygon } from 'vue2-leaflet-editable'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import 'leaflet/dist/leaflet.css'
import { MapDrawingHelpers } from '@/mixins/MapDrawingHelpers'
import Spinner from '@/components/layouts/Spiner'
import GymSpace from '@/models/GymSpace'

export default {
  name: 'GymSpacePlan',
  components: {
    Spinner,
    EditableMap,
    EditablePolygon,
    LImageOverlay,
    LControlZoom
  },
  mixins: [MapDrawingHelpers],

  props: {
    gymSpace: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      reloadingData: false,
      map: null,
      minZoom: -2,
      drawingSectorPolygon: null,
      editingSectorId: null,
      isNewPolygon: false,
      savingPolygon: false,
      crs: CRS.Simple,
      gymSpaceData: this.gymSpace
    }
  },

  computed: {
    url () {
      return this.gymSpaceData.planUrl
    },

    sectorPolygons () {
      const sectorPolygon = []
      for (const sector of this.gymSpaceData.GymSectors) {
        if (sector.polygon) { sectorPolygon.push(sector) }
      }
      return sectorPolygon
    },

    bounds () {
      return [[0, 0], [this.gymSpaceData.scheme_height / 6, this.gymSpaceData.scheme_width / 6]]
    }
  },

  watch: {
    bounds () {
      this.setMapView()
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

  beforeDestroy () {
    this.$root.$off('startEditSectorPolygon')
    this.$root.$off('activeSector')
    this.$root.$off('stopEditingSectorPolygon')
    this.$root.$off('setWidthMap')
  },

  methods: {
    onReadyMap () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setWidthMap () {
      const width = this.$refs['map-col-box'].offsetWidth
      if (width === 0) {
        this.$refs['map-area'].style.width = '100%'
      } else {
        this.$refs['map-area'].style.width = `${this.$refs['map-col-box'].offsetWidth - 10}px`
      }
    },

    setMapView () {
      this.map.fitBounds(this.bounds)
    },

    startEditSectorPolygon (gymSectorId) {
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

    stopEditingSectorPolygon () {
      this.map.editTools.commitDrawing()
      this.map.editTools.stopDrawing()
      this.drawingSectorPolygon.disableEdit()
      this.saveSectorPolygon(this.drawingSectorPolygon._latlngs)
    },

    clearSectorSelection () {
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

    activeSector (gymSectorId) {
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

    saveSectorPolygon (polygon) {
      if (this.savingPolygon) { return }

      this.savingPolygon = true
      const data = {
        gym_id: this.gymSpaceData.gym.id,
        gym_space_id: this.gymSpaceData.id,
        id: this.editingSectorId,
        polygon: JSON.stringify(this.latLgnToArray(polygon))
      }
      if (this.isNewPolygon) { this.reloadingData = true }
      new GymSectorApi(this.$axios, this.$auth)
        .update(data)
        .then(() => {
          if (this.isNewPolygon) { this.reloadGymSpaceData() }
        })
        .catch(() => {
          this.reloadingData = false
        })
        .finally(() => {
          this.savingPolygon = false
        })
    },

    reloadGymSpaceData () {
      this.reloadingData = true
      new GymSpace({ axios: this.$axios, auth: this.$auth })
        .find(
          this.gymSpaceData.gym.id,
          this.gymSpaceData.id
        )
        .then((resp) => {
          this.gymSpaceData = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.reloadingData = false
        })
    },

    filterBySector (sectorId) {
      this.$root.$emit('filterBySector', sectorId)
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
    left: 0;
    width: 100vw !important;
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
