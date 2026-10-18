<template>
  <div
    style="height: 100%"
    class="spray-wall-map-editor"
    :class="editingMode || addingMode ? '--editing' : '--interactive'"
  >
    <!-- MAP -->
    <div
      class="leaflet-spray-wall-container"
      :class="sprayWallContainerClasses"
    >
      <editable-map
        ref="pictureMap"
        editable
        :min-zoom="minZoom"
        :crs="crs"
        :options="{ zoomControl: false, zoomSnap: 0.2, zoomDelta: 0.2, doubleClickZoom: false, keyboard: false }"
        style="height: 100%; width: 100%"
        @ready="setPictureMap"
      >
        <l-image-overlay
          :url="url"
          :bounds="bounds"
        />
        <editable-polygon
          v-for="(hold, holdIndex) in sprayWallHolds"
          :key="`polygon-hold-${holdIndex}`"
          :ref="`polygon-hold-${hold.id}`"
          :fill-opacity="0.2"
          :fill-color="hold.id === selectedHold?.id ? '#3388ff' : 'rgb(255, 255, 255)'"
          class-name="spray-wall-hold-polygon"
          :color="hold.id === selectedHold?.id ? '#3388ff' : 'rgb(255, 255, 255)'"
          :weight="3"
          :lat-lngs="pointsToLatLngs(hold.points)"
          @click="selectHold(hold)"
        />
        <!-- :interactive="!(editingMode || addingMode)" -->
      </editable-map>

      <!-- Pipelines overlay -->
      <v-fade-transition>
        <div
          v-if="runningPipelines.length > 0"
          class="pipeline-overlay d-flex flex-column justify-center"
        >
          <div class="text-center">
            <animate-oblyk-logo color="rgb(255, 255, 255)" animate />
            <div class="white--text font-weight-medium">
              Détéction des prises...
            </div>
          </div>
        </div>
      </v-fade-transition>
    </div>

    <!-- TOOL BOX RIGHT SIDE -->
    <div class="spray-wall-editor-toolbar --left-side">
      <!-- SPRAY WALL TITLE -->
      <v-card
        class="d-flex align-center pl-1 pr-2 mb-1"
        :loading="savingHold"
      >
        <v-btn
          :to="`${gym.adminPath}/spray-walls/${sprayWall.id}`"
          icon
        >
          <v-icon color="primary">
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
        <div class="mx-2 py-1">
          <div class="font-weight-bold">
            Spray Wall Studio
          </div>
          <div class="mt-n1 text--disabled">
            {{ sprayWallHolds.length || 0 }} prises
          </div>
        </div>
      </v-card>

      <!-- NO PIPELINE AND NO HOLDS -->
      <v-card
        v-if="sprayWallHolds.length === 0 && runningPipelines.length === 0"
        class="pa-1"
      >
        <v-btn
          color="deep-purple accent-3"
          style="background-color: rgba(104, 35, 255, 0.08)"
          elevation="0"
          dark
          outlined
          @click="$refs.sprayWallEditorPipelineDialog.togglePipelineDialog()"
        >
          <v-icon left>
            {{ mdiCreation }}
          </v-icon>
          Détecter les prises
        </v-btn>
      </v-card>

      <!-- PIPELINE RUNNING -->
      <v-card
        v-if="runningPipelines.length > 0"
        rounded="sm"
        class="pa-1"
      >
        <spray-wall-pipeline-card
          v-for="(pipeline, pipelineIndex) in runningPipelines"
          :key="`pipeline-index-${pipelineIndex}`"
          :spray-wall="sprayWall"
          :spray-wall-pipeline="pipeline"
        />
      </v-card>

      <!-- TOOLS -->
      <v-card
        v-if="runningPipelines.length === 0 && selectedHold === null"
        class="pa-1 mt-1 text-center"
      >
        <v-btn
          v-model="addingMode"
          text
          elevation="0"
          block
          :color="addingMode ? 'deep-purple accent-3' : null"
          @click="addHold"
        >
          <v-icon left>
            {{ oblykAddHold }}
          </v-icon>
          Ajouter une prise
        </v-btn>
        <small v-if="addingMode" class="text--disabled">
          Cliquez autour d'une prise
        </small>
      </v-card>

      <!-- SELECTED HOLD -->
      <v-card
        v-if="selectedHold"
        class="border pl-2 py-1 mt-1 pr-1 d-flex align-center"
      >
        <div
          style="height: 43px; width: 43px; border-radius: 0"
          class="d-flex flex-column justify-center"
        >
          <spray-wall-hold-svg :hold="selectedHold" :padding="0.04" />
        </div>
        <v-spacer />
        <v-btn
          v-model="editingMode"
          :color="editingMode ? 'deep-purple accent-3' : null"
          class="ml-2"
          icon
          @click="editHold"
        >
          <v-icon size="20">
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          :loading="deletingHold"
          @click="deleteHold"
        >
          <v-icon size="20" color="red">
            {{ mdiTrashCan }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="escape"
        >
          <v-icon size="20">
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card>

      <!-- SAVE EDITING HOLD OR ADDING HOLD -->
      <div
        v-if="addingMode || editingMode"
        class="d-flex mt-1"
      >
        <v-card class="pa-1 mr-1">
          <v-btn
            text
            block
            :loading="savingHold"
            @click="saveHold"
          >
            <v-icon left>
              {{ mdiContentSave }}
            </v-icon>
            Sauvegarder
          </v-btn>
        </v-card>
        <v-card class="pa-1 mr-1">
          <v-btn
            style="min-width: 36px"
            class="px-0"
            text
            @click="escape"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-card>
      </div>
    </div>

    <!-- TOOL BOX LEFT SIDE -->
    <div class="spray-wall-editor-toolbar --right-side d-flex">
      <v-card class="pa-1 mr-1">
        <v-btn
          v-model="holdMasked"
          text
          :color="holdMasked ? 'deep-purple accent-3' : null"
          style="min-width: 36px"
          class="px-0"
          @click="toggleMask"
        >
          <v-icon color="primary">
            {{ mdiCircleOpacity }}
          </v-icon>
        </v-btn>
      </v-card>
      <v-card class="pa-1">
        <v-btn
          text
          style="min-width: 36px"
          class="px-0"
          @click="$refs.sprayWallEditorHelpDialog.toggleHelpDialog()"
        >
          <v-icon color="primary">
            {{ mdiHelp }}
          </v-icon>
        </v-btn>
      </v-card>
    </div>

    <!-- DIALOG : PIPELINE HELPER -->
    <spray-wall-editor-pipeline-dialog
      ref="sprayWallEditorPipelineDialog"
      :spray-wall-holds="sprayWallHolds"
      :spray-wall="sprayWall"
    />

    <!-- DIALOG : HELP -->
    <spray-wall-editor-help-dialog
      ref="sprayWallEditorHelpDialog"
      :spray-wall="sprayWall"
    />
  </div>
</template>

<script>
import {
  mdiPlus,
  mdiContentSave,
  mdiTrashCan,
  mdiPencil,
  mdiArrowLeft,
  mdiCreation,
  mdiHelp,
  mdiClose,
  mdiCircleOpacity
} from '@mdi/js'
import { CRS } from 'leaflet'
import { LImageOverlay } from 'vue2-leaflet'
import { EditableMap, EditablePolygon } from 'vue2-leaflet-editable'
import { oblykAddHold } from '~/assets/oblyk-icons'
import 'leaflet/dist/leaflet.css'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import SprayWallPipelineCard from '~/components/sprayWallPipelines/SprayWallPipelineCard'
import SprayWallEditorPipelineDialog from '~/components/sprayWalls/SprayWallEditorPipelineDialog'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo'
import SprayWallEditorHelpDialog from '~/components/sprayWalls/SprayWallEditorHelpDialog'
import SprayWallHoldSvg from '~/components/sprayWallHolds/SprayWallHoldSvg.vue'

export default {
  name: 'SprayWallMapEditor',
  components: {
    SprayWallHoldSvg,
    SprayWallEditorHelpDialog,
    AnimateOblykLogo,
    SprayWallEditorPipelineDialog,
    SprayWallPipelineCard,
    EditableMap,
    EditablePolygon,
    LImageOverlay
  },
  mixins: [ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallHolds: {
      type: Array,
      required: true
    },
    sprayWallPipelines: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      pictureMap: null,
      minZoom: -2,
      crs: CRS.Simple,
      drawingHoldPolygon: null,
      addingMode: false,
      editingMode: false,
      savingHold: false,
      selectedHold: null,
      deletingHold: false,
      runningPipeline: false,
      holdMasked: false,

      mdiPlus,
      mdiContentSave,
      mdiTrashCan,
      mdiPencil,
      mdiArrowLeft,
      mdiCreation,
      mdiHelp,
      mdiClose,
      oblykAddHold,
      mdiCircleOpacity
    }
  },

  computed: {
    url () {
      return this.imageVariant(this.sprayWall.attachments.picture, { fit: 'scale-down', height: 2000, width: 2000 })
    },

    bounds () {
      return [[0, 0], [this.sprayWall.picture_height, this.sprayWall.picture_width]]
    },

    runningPipelines () {
      const pipelines = []
      for (const pipeline of this.sprayWallPipelines) {
        if (pipeline.running) {
          pipelines.push(pipeline)
        }
      }
      return pipelines
    },

    sprayWallContainerClasses () {
      const classes = []
      if (this.runningPipelines.length > 0) {
        classes.push('pipeline-running')
      }
      if (this.holdMasked) {
        classes.push('--hold-masked')
      }
      return classes.join(' ')
    }
  },

  mounted () {
    this.setPictureMap()
    window.addEventListener('keydown', this.onKey)
    if (this.sprayWallHolds.length === 0) {
      this.$refs.sprayWallEditorHelpDialog.toggleHelpDialog()
    }
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.onKey)
  },

  methods: {
    onKey (e) {
      // ne pas intercepter pendant une saisie de texte
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) {
        return
      }

      // Ctrl/Cmd + "+" = zoom du navigateur : on laisse faire
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return
      }

      if (e.key === 'p' && !e.repeat) {
        e.preventDefault()
        this.addHold()
        return true
      }

      if (e.key === 'e' && !e.repeat) {
        e.preventDefault()
        this.editHold()
        return true
      }

      if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault()
        this.saveHold()
        return true
      }

      if (e.key === 'Escape' && !e.repeat) {
        e.preventDefault()
        this.escape()
        return true
      }

      if (e.key === 'Delete' && !e.repeat) {
        e.preventDefault()
        this.deleteHold()
        return true
      }
    },

    escape () {
      if (this.drawingHoldPolygon !== null) {
        this.drawingHoldPolygon.disableEdit()
        if (this.addingMode) {
          this.drawingHoldPolygon.remove()
        }
        this.drawingHoldPolygon = null
      }
      this.selectedHold = null
      this.addingMode = false
      this.editingMode = false
    },

    selectHold (hold) {
      // Switch to edit mode is
      if (this.selectedHold?.id === hold?.id && !this.editingMode) {
        this.editHold()
        return true
      } else if (this.editingMode || this.addingMode) {
        return true
      }
      this.selectedHold = hold
    },

    setPictureMap () {
      this.pictureMap = this.$refs.pictureMap.mapObject
      this.setPictureMapView()
    },

    setPictureMapView () {
      this.pictureMap.fitBounds(
        this.bounds,
        {
          paddingTopLeft: [0, 0],
          paddingBottomRight: [0, 0]
        }
      )
    },

    toggleMask () {
      this.holdMasked = !this.holdMasked
    },

    toLatLng ([nx, ny]) {
      return [(1 - ny) * this.sprayWall.picture_height, nx * this.sprayWall.picture_width]
    },

    toPoint ({ lat, lng }) {
      return [
        +(lng / this.sprayWall.picture_width).toFixed(4),
        +(1 - lat / this.sprayWall.picture_height).toFixed(4)
      ]
    },

    pointsToLatLngs (points) {
      const latLngs = points.map(this.toLatLng)
      return latLngs
    },

    editHold () {
      if (this.selectedHold === null) {
        return false
      } else if (this.editingMode) {
        this.cancelEdit()
        return false
      }

      const polygonHold = this.$refs[`polygon-hold-${this.selectedHold.id}`]
      if (polygonHold) {
        this.drawingHoldPolygon = polygonHold[0].mapObject
        setTimeout(() => {
          this.drawingHoldPolygon.enableEdit()
        }, 150)
        this.editingMode = true
      } else {
        this.addHold()
      }
    },

    cancelEdit () {
      this.editingMode = false
      if (this.drawingHoldPolygon !== null) {
        this.drawingHoldPolygon.disableEdit()
      }
    },

    addHold () {
      this.cancelEdit()
      this.selectedHold = null
      if (this.addingMode && this.drawingHoldPolygon._latlngs[0]?.length >= 3) {
        this.saveHold().then(() => {
          this.addingMode = true
          this.drawingHoldPolygon = this.pictureMap.editTools.startPolygon()
        })
      } else {
        this.addingMode = true
        this.drawingHoldPolygon = this.pictureMap.editTools.startPolygon()
      }
    },

    saveHold () {
      return new Promise((resolve, reject) => {
        const points = []
        const latlngs = this.drawingHoldPolygon._latlngs[0]
        for (const latLng of latlngs) {
          points.push(this.toPoint(latLng))
        }
        this.drawingHoldPolygon.disableEdit()
        this.savingHold = true
        const data = { spray_wall_hold: { points } }
        let promise = new OblykApi(this.$axios, this.$auth)
        promise = this.addingMode
          ? promise.post(`/gyms/${this.sprayWall.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_holds`, data)
          : promise.put(`/gyms/${this.sprayWall.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_holds/${this.selectedHold.id}`, data)

        promise
          .then((resp) => {
            if (this.addingMode) {
              this.drawingHoldPolygon.remove()
            }
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            this.addingMode = false
            this.editingMode = false
            this.savingHold = false
            resolve()
          })
      })
    },

    deleteHold () {
      if (this.selectedHold === null) {
        return false
      }
      this.deletingHold = true
      new OblykApi(this.$axios, this.$auth)
        .delete(`/gyms/${this.sprayWall.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_holds/${this.selectedHold.id}`)
        .then(() => {
          this.selectedHold = null
        })
        .finally(() => {
          this.deletingHold = false
        })
    }
  }
}
</script>

<style lang="scss">
.spray-wall-map-editor {
  position: relative;
  .leaflet-container {
    background-color: transparent;
  }
  &.--interactive {
    .leaflet-container {
      .spray-wall-hold-polygon {
        &:hover {
          fill: rgba(116, 58, 213);
          fill-opacity: 0.3;
          stroke: rgba(116, 58, 213, 1);
        }
      }
    }
  }
  &.--editing {
    .leaflet-container {
      .spray-wall-hold-polygon {
        cursor: crosshair;
      }
    }
  }

  .spray-wall-editor-toolbar {
    z-index: 10;
    position: absolute;
    top: 5px;
    &.--right-side {
      right: 5px;
    }
    &.--left-side {
      left: 5px;
    }
    .v-card {
      border-radius: 13px;
      box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
    }
  }
  .pipeline-overlay {
    background-image: radial-gradient(rgba(116, 58, 213, 0.4), rgba(116, 58, 213, 0.08));
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    top: 0;
    left: 0
  }
  .leaflet-spray-wall-container {
    height: 100%;
    overflow: hidden;
    position: relative;
    .leaflet-image-layer {
      border-radius: 8px;
    }
    &.--hold-masked {
      .spray-wall-hold-polygon {
        fill: #4CAF50;
        fill-opacity: 0.8;
        stroke: #81C784;
      }
    }
    &.pipeline-running {
      .leaflet-image-layer {
        animation: scan-shadow 3s ease-in-out infinite alternate;
      }
    }
  }

  @keyframes scan-shadow {
    from { box-shadow: 0 0 14px 0   rgba(116, 58, 213, .35); }
    to   { box-shadow: 0 0 44px 10px rgba(116, 58, 213, .60); }
  }

  /* Retour doux quand l'animation s'arrête */
  .leaflet-spray-wall-container.pipeline-running .leaflet-image-layer { transition: box-shadow .6s ease; }

  @media (prefers-reduced-motion: reduce) {
    .leaflet-spray-wall-container.pipeline-running .leaflet-image-layer { animation-duration: 10s; }
  }
}
</style>
