<template>
  <div
    ref="viewport"
    style="height: 100%"
    class="spray-wall-route-editor-viewport"
    @pointerdown="onPointerDown"
    @click="onViewportClick"
  >
    <div
      ref="sprayWallRouteEditorArea"
      class="spray-wall-route-editor-area"
      :style="{ aspectRatio: `${W} / ${H}` }"
    >
      <v-img
        :src="url()"
        draggable="false"
        width="100%"
        height="100%"
        contain
        alt="Image"
      />

      <svg :viewBox="`0 0 ${W} ${H}`">
        <defs>
          <mask
            id="veil-mask"
            maskUnits="userSpaceOnUse"
            :width="W"
            :height="H"
            x="0"
            y="0"
          >
            <rect :width="W" :height="H" fill="white" />
            <path
              v-for="(hold, holdIndex) in routeHolds"
              :key="`hold-index-${holdIndex}`"
              :d="holdPath(hold)"
              fill="black"
            />
          </mask>
        </defs>

        <!-- voile -->
        <rect
          :width="W"
          :height="H"
          fill="black"
          :fill-opacity="overlayOpacity"
          class="rounded"
          mask="url(#veil-mask)"
          pointer-events="none"
        />

        <!-- contour des prises sélectionnées -->
        <path
          v-for="(hold, routeHoldIndex) in routeHolds"
          :key="`selected-hold-index-${routeHoldIndex}`"
          :d="holdPath(hold)"
          :stroke="holdColor(hold.holdType)"
          :class="selectedHold?.id === hold.id ? 'selected-hold' : 'unselected-hold'"
          :stroke-width="strokeWidth * (selectedHold?.id === hold.id ? 6 : 4)"
          stroke-linecap="round"
          pointer-events="none"
        />

        <!-- zones cliquables : TOUTES les prises, invisibles -->
        <path
          v-for="(hold, holdIndex) in sprayWallHolds"
          :key="`all-hold-index-${holdIndex}`"
          :d="holdPath(hold)"
          class="available-hold"
          fill="transparent"
          stroke="transparent"
          :stroke-width="strokeWidth * 3"
          pointer-events="all"
          @click.stop="onHoldClick(hold, $event)"
        />
      </svg>
    </div>

    <!-- TOP LEFT TOOLBAR -->
    <div class="toolbar-top-left">
      <v-card rounded="pill" dark>
        <v-btn
          icon
          exact-path
          :to="sprayWall.app_path"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </v-card>
    </div>

    <!-- TOP LEFT TOOLBAR -->
    <div class="toolbar-top-center">
      <v-btn
        dark
        elevation="0"
        :disabled="!registrable"
        color="deep-purple accent-3"
        @click="$refs.sprayWallRouteEditorDialog.openDialog()"
      >
        Enregistrer mon bloc
      </v-btn>
    </div>

    <!-- TOP RIGHT TOOLBAR -->
    <div class="toolbar-top-right">
      <v-card rounded="pill" dark>
        <v-btn
          icon
          @click.stop="recenter"
        >
          <v-icon>
            {{ mdiArrowCollapse }}
          </v-icon>
        </v-btn>
      </v-card>
    </div>

    <v-slide-y-transition>
      <div
        v-if="selectedHold"
        class="bottom-toolbar d-flex"
      >
        <div
          class="hold-type-btn --start-hold"
          :class="selectedHold.holdType === 'start' ? '--selected-hold-type' : ''"
          @click.stop="pushHoldTo('start')"
        >
          <v-btn icon>
            <v-icon>
              {{ oblykStartHold }}
            </v-icon>
          </v-btn>
          <div class="button-label">
            Départ
          </div>
        </div>
        <div
          class="hold-type-btn --middle-hold"
          :class="selectedHold.holdType === 'middle' ? '--selected-hold-type' : ''"
          @click.stop="pushHoldTo('middle')"
        >
          <v-btn icon>
            <v-icon>
              {{ mdiHandFrontRight }}
            </v-icon>
          </v-btn>
          <div class="button-label">
            Main
          </div>
        </div>
        <div
          class="hold-type-btn --foot-hold"
          :class="selectedHold.holdType === 'foot' ? '--selected-hold-type' : ''"
          @click.stop="pushHoldTo('foot')"
        >
          <v-btn icon>
            <v-icon>
              {{ mdiFootPrint }}
            </v-icon>
          </v-btn>
          <div class="button-label">
            Pied
          </div>
        </div>
        <div
          class="hold-type-btn --top-hold"
          :class="selectedHold.holdType === 'top' ? '--selected-hold-type' : ''"
          @click.stop="pushHoldTo('top')"
        >
          <v-btn icon>
            <v-icon>
              {{ mdiFlagCheckered }}
            </v-icon>
          </v-btn>
          <div class="button-label">
            Top
          </div>
        </div>
        <div class="hold-type-btn">
          <v-btn icon @click.stop="selectedHold = null">
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <div v-if="selectedHold === null" class="bottom-toolbar font-weight-bold text-center pa-1" style="line-height: 1em">
        <small>
          Cliquez sur les prises pour les ajouter à votre bloc
        </small>
      </div>
    </v-slide-y-transition>

    <spray-wall-route-editor-dialog
      ref="sprayWallRouteEditorDialog"
      :spray-wall="sprayWall"
      :gym="gym"
    />
  </div>
</template>

<script>
import {
  mdiArrowCollapse,
  mdiClose,
  mdiHandFrontRight,
  mdiFootPrint,
  mdiFlagCheckered,
  mdiArrowLeft
} from '@mdi/js'
import * as panzoom from 'panzoom'
import { oblykStartHold } from '~/assets/oblyk-icons'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SprayWallRouteEditorDialog from '~/components/sprayWallRoutes/SprayWallRouteEditorDialog'

export default {
  name: 'SprayWallRouteEditor',
  components: { SprayWallRouteEditorDialog },
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
    }
  },

  data () {
    return {
      overlayOpacity: 0.5,
      panzoom: null,
      scale: 1,
      px: 1,
      start: null,
      selectedHold: null,
      routeHolds: [],
      gesture: null,
      registrable: false,
      initialTransform: null,

      mdiArrowCollapse,
      mdiClose,
      mdiHandFrontRight,
      mdiFootPrint,
      oblykStartHold,
      mdiFlagCheckered,
      mdiArrowLeft
    }
  },

  computed: {
    W () {
      return this.sprayWall.picture_width
    },

    H () {
      return this.sprayWall.picture_height
    },

    strokeWidth () {
      return 1 / (this.px * this.scale)
    }
  },

  mounted () {
    const area = this.$refs.sprayWallRouteEditorArea
    this.px = area.clientWidth / this.W
    this.panzoom = panzoom(area, {
      bounds: true,
      zoomDoubleClickSpeed: 1,
      onTouch: () => false
    })
    this.panzoom.on('transform', () => {
      this.scale = this.panzoom.getTransform().scale
    })
    this.recenter()
    this.setRegistrable()
  },

  beforeDestroy () {
    this.panzoom && this.panzoom.dispose()
  },

  methods: {
    url () {
      return this.imageVariant(this.sprayWall.attachments.picture, { fit: 'scale-down', height: 4000, width: 4000 })
    },

    holdPoints (hold) {
      return hold.points.map(([x, y]) => `${x * this.W},${y * this.H}`).join(' ')
    },

    unselectedHold () {
      this.selectedHold = null
    },

    addHold (hold) {
      if (hold.id === this.selectedHold?.id) {
        this.deleteHold()
        return
      }

      const index = this.routeHolds.findIndex(item => item.id === hold.id)
      if (index === -1) {
        if (this.routeHolds.length === 0) {
          hold.holdType = 'start'
        } else {
          hold.holdType ||= 'middle'
        }
        this.routeHolds.push(hold)
      }
      this.selectedHold = hold
      this.setRegistrable()
    },

    pushHoldTo (type) {
      const index = this.routeHolds.findIndex(item => item.id === this.selectedHold.id)
      this.routeHolds[index].holdType = type
      this.selectedHold = null
      this.setRegistrable()
    },

    deleteHold () {
      const index = this.routeHolds.findIndex(item => item.id === this.selectedHold.id)
      this.routeHolds.splice(index, 1)
      this.selectedHold = null
      this.setRegistrable()
    },

    holdColor (type) {
      if (type === 'start') {
        return '#FFFF00'
      } else if (type === 'foot') {
        return '#00E676'
      } else if (type === 'top') {
        return '#FF1744'
      } else {
        return 'white'
      }
    },

    setRegistrable () {
      const startsHold = this.routeHolds.findIndex(item => item.holdType === 'start')
      const topsHold = this.routeHolds.findIndex(item => item.holdType === 'top')
      this.registrable = startsHold !== -1 && topsHold !== -1
    },

    recenter () {
      const pz = this.panzoom
      if (!pz) { return }
      const area = this.$refs.sprayWallRouteEditorArea
      const box = area.parentElement
      const w = area.offsetWidth
      const h = area.offsetHeight

      const target = Math.min(box.clientWidth / w, box.clientHeight / h)
      const { scale } = pz.getTransform()

      pz.zoomTo(0, 0, target / scale)
      pz.moveTo(
        (box.clientWidth - w * target) / 2,
        (box.clientHeight - h * target) / 2
      )
    },

    onPointerDown (e) {
      if (e.isPrimary) {
        this.gesture = { x: e.clientX, y: e.clientY, multi: false }
      } else if (this.gesture) {
        this.gesture.multi = true
      }
    },

    isTap (e) {
      const g = this.gesture
      if (!g || g.multi) { return false }
      return Math.hypot(e.clientX - g.x, e.clientY - g.y) < 6
    },

    onHoldClick (hold, e) {
      if (this.isTap(e)) { this.addHold(hold) }
    },

    onViewportClick (e) {
      if (this.isTap(e)) { this.unselectedHold() }
    },

    holdPath (hold) {
      const points = this.holdPoints(hold)
        .trim()
        .split(/\s+/)
        .map((p) => {
          const [x, y] = p.split(',').map(Number)
          return {
            x,
            y
          }
        })
      return this.roundedPolygonPath(points, 10)
    },

    roundedPolygonPath (points, radius = 8) {
      const n = points.length
      let d = ''

      for (let i = 0; i < n; i++) {
        const p0 = points[(i - 1 + n) % n]
        const p1 = points[i]
        const p2 = points[(i + 1) % n]

        const v1 = { x: p0.x - p1.x, y: p0.y - p1.y }
        const v2 = { x: p2.x - p1.x, y: p2.y - p1.y }
        const l1 = Math.hypot(v1.x, v1.y) || 1
        const l2 = Math.hypot(v2.x, v2.y) || 1

        const r = Math.min(radius, l1 / 2, l2 / 2)

        const start = { x: p1.x + (v1.x / l1) * r, y: p1.y + (v1.y / l1) * r }
        const end = { x: p1.x + (v2.x / l2) * r, y: p1.y + (v2.y / l2) * r }

        d += (i === 0 ? 'M' : 'L') + `${start.x},${start.y} `
        d += `Q${p1.x},${p1.y} ${end.x},${end.y} `
      }
      return d + 'Z'
    }
  }
}
</script>

<style lang="scss">
.spray-wall-route-editor-viewport {
  overflow: hidden;
  position: relative;
  background-color: rgb(40, 40, 40);
  .spray-wall-route-editor-area {
    position: relative;
    svg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      .available-hold {
        transition: fill 0.2s, stroke 0.2s;
        &:hover {
          fill: rgba(255, 255, 255, 0.1);
          stroke: rgba(255, 255, 255, 0.3);
        }
      }
      .unselected-hold {
        fill: none;
      }
      .selected-hold {
        stroke-dasharray: 10 15;
        fill: rgba(24, 255, 255, 0.4);
        animation: selectedHoldAnimation 1.5s linear infinite;
      }
    }
  }
  .toolbar-top-right, .toolbar-top-left, .toolbar-top-center {
    position: absolute;
    top: 5px;
  }
  .toolbar-top-right {
    right: 5px;
  }
  .toolbar-top-left {
    left: 5px;
  }
  .toolbar-top-center {
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom-toolbar {
    position: absolute;
    bottom: 10px;
    color: white;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    .hold-type-btn {
      border-style: solid;
      border-width: 2px;
      border-radius: 6px;
      padding-top: 4px;
      border-color: rgba(255, 255, 255, 0);
      width: 50px;
      text-align: center;
      &.--start-hold {
        &:hover {
          border-color: rgb(255, 255, 0, 1);
          background-color: rgba(255, 255, 0, 0.2);
        }
      }
      &.--middle-hold {
        &:hover {
          border-color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      &.--foot-hold {
        &:hover {
          border-color: rgba(0, 230, 118, 1);
          background-color: rgba(0, 230, 118, 0.2);
        }
      }
      &.--top-hold {
        &:hover {
          border-color: rgba(255, 23, 68, 1);
          background-color: rgba(255, 23, 68, 0.2);
        }
      }
      &.--selected-hold-type {
        &.--start-hold {
          border-color: rgba(255, 255, 0, 1);
          background-color: rgba(255, 255, 0, 0.2);
        }
        &.--middle-hold {
          border-color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, 0.2);
        }
        &.--foot-hold {
          border-color: rgba(0, 230, 118, 1);
          background-color: rgba(0, 230, 118, 0.2);
        }
        &.--top-hold {
          border-color: rgba(255, 23, 68, 1);
          background-color: rgba(255, 23, 68, 0.2);
        }
      }
      .v-btn {
        background-color: rgba(255, 255, 255, 0.8);
      }
      .button-label {
        font-weight: 800;
        font-size: 0.8em;
      }
    }
  }
}
@keyframes selectedHoldAnimation {
  to { stroke-dashoffset: -25; }
}
</style>
