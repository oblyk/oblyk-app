<template>
  <div class="gym-space-map">
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
        v-for="sector in sectorPolygons()"
        :key="sector.id"
        :lat-lngs="sector.jsonPolygon"
        @click="filterBySector(sector.id)"
        :ref="`polygon-sector-${sector.id}`"
      />
    </editable-map>
  </div>
</template>
<script>
import { CRS } from 'leaflet'
import { LImageOverlay, LControlZoom } from 'vue2-leaflet'
import { EditableMap, EditablePolygon } from 'vue2-leaflet-editable'
import GymSectorApi from '@/services/oblyk-api/gymSectorApi'

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
      url: this.gymSpace.planUrl(),
      bounds: [[0, 0], [this.gymSpace.scheme_height / 6, this.gymSpace.scheme_width / 6]],
      minZoom: -2,
      crs: CRS.Simple,
      drawingSectorPolygon: null,
      editingSectorId: null,
      isNewPolygon: false,
      space: this.gymSpace
    }
  },

  mounted () {
    this.$root.$on('startEditSectorPolygon', (gymSectorId) => {
      this.startEditSectorPolygon(gymSectorId)
    })
    this.$root.$on('stopEditingSectorPolygon', () => {
      this.stopEditingSectorPolygon()
    })
  },

  methods: {
    onReadyMap: function () {
      this.map = this.$refs.map.mapObject
      this.setMapView()
    },

    setMapView: function () {
      this.map.setView([this.space.scheme_height / 12, this.space.scheme_width / 12], 1)
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

    sectorPolygons: function () {
      const sectorPolygon = []
      for (const sector of this.space.GymSectors) {
        if (sector.polygon) sectorPolygon.push(sector)
      }
      return sectorPolygon
    },

    saveSectorPolygon: function (polygon) {
      const data = {
        gym_id: this.space.gym.id,
        gym_space_id: this.space.id,
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
    },

    reloadGymSpaceData: function () {
      this.reloadingData = true
      new GymSpace()
        .find(
          this.space.gym.id,
          this.space.id
        )
        .then((resp) => {
          this.space = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.reloadingData = false
        })
    },

    filterBySector: function (sectorId) {
      this.$root.$emit('filtreBySector', sectorId)
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
      background-color: #ffffff;
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
</style>
