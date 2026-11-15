<template>
  <div
    ref="viewport"
    style="height: 100%"
    class="spray-wall-route-viewer-viewport"
    @pointerdown="onPointerDown"
    @click="onViewportClick"
  >
    <div
      ref="sprayWallRouteViewerArea"
      class="spray-wall-route-viewer-area"
      :style="{ aspectRatio: `${W} / ${H}` }"
    >
      <v-img
        :src="url()"
        :lazy-src="url(720)"
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
          :stroke="holdColor(hold.hold_type)"
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
  </div>
</template>

<script>
import { mdiArrowCollapse } from '@mdi/js'
import * as panzoom from 'panzoom'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'SprayWallRouteViewer',
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
    clickable: {
      type: Boolean,
      default: false
    },
    sprayWallRoute: {
      type: Object,
      default: null
    },
    selectedHoldCallback: {
      type: Function,
      default: null
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
      sprayWallHolds: this.sprayWall?.spray_wall_holds || this.sprayWallRoute.spray_wall_route_holds.map(sprayWallRouteHold => sprayWallRouteHold.spray_wall_hold),

      mdiArrowCollapse
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

  watch: {
    sprayWallRoute () {
      this.setSprayWallRouteHolds()
    }
  },

  mounted () {
    const area = this.$refs.sprayWallRouteViewerArea
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
    this.setSprayWallRouteHolds()
  },

  beforeDestroy () {
    this.panzoom && this.panzoom.dispose()
  },

  methods: {
    url (size = 4000) {
      return this.imageVariant(this.sprayWall.attachments.picture, { fit: 'scale-down', height: size, width: size })
    },

    holdPoints (hold) {
      return hold.points.map(([x, y]) => `${x * this.W},${y * this.H}`).join(' ')
    },

    unselectedHold () {
      if (!this.clickable) {
        return false
      }

      this.selectedHold = null
      this.routeHolds = []
    },

    setSprayWallRouteHolds () {
      if (this.sprayWallRoute === null) { return }
      this.routeHolds = []

      for (const routeHold of this.sprayWallRoute.spray_wall_route_holds || []) {
        const index = this.sprayWallHolds.findIndex(item => parseInt(item.id) === parseInt(routeHold.spray_wall_hold.id))
        const hold = this.sprayWallHolds[index]
        hold.hold_type = routeHold.hold_type
        this.routeHolds.push(hold)
      }
      if (this.selectedHold) { this.routeHolds.push(this.selectedHold) }
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

    recenter () {
      const pz = this.panzoom
      if (!pz) { return }
      const area = this.$refs.sprayWallRouteViewerArea
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
      if (!this.clickable) {
        return false
      }

      if (this.isTap(e)) {
        this.selectedHold = hold
        this.routeHolds = [hold]
        if (this.selectedHoldCallback) {
          this.selectedHoldCallback(hold)
        }
      }
    },

    onViewportClick (e) {
      if (!this.clickable) {
        return false
      }

      if (this.isTap(e)) {
        this.unselectedHold()
      }
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
.spray-wall-route-viewer-viewport {
  overflow: hidden;
  position: relative;
  background-color: rgb(40, 40, 40);
  .spray-wall-route-viewer-area {
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
        stroke-dasharray: 15 35;
        fill: rgba(101, 31, 255, 0.3);
        stroke: #B388FF;
        animation: selectedHoldAnimation 1.5s linear infinite;
      }
    }
  }
  .toolbar-top-right {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
@keyframes selectedHoldAnimation {
  to { stroke-dashoffset: -50; }
}
</style>
