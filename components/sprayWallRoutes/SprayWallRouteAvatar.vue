<template>
  <svg
    :viewBox="viewBox"
    class="spray-wall-route-avatar"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Miniature du bloc"
  >
    <polygon
      v-for="hold in holds"
      :key="hold.id"
      :points="hold.points"
      fill-opacity="0.55"
      :class="hold.class"
      stroke-width="2"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<script>
// ordre de dessin : les départs et tops passent au-dessus
const PRIORITY = { middle: 0, foot: 1, start: 2, top: 3 }

export default {
  name: 'SprayWallRouteAvatar',
  props: {
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallRoute: {
      type: Object,
      required: true
    },
    crop: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    width () {
      return this.sprayWall.picture_width
    },

    height () {
      return this.sprayWall.picture_height
    },

    holds () {
      return (this.sprayWallRoute.spray_wall_route_holds || [])
        .filter(hold => hold.spray_wall_hold && hold.spray_wall_hold.points)
        .map(hold => ({
          id: hold.id,
          type: hold.hold_type,
          class: `spray-wall-hold-${hold.hold_type}`,
          raw: hold.spray_wall_hold.points.map(([x, y]) => [x * this.width, y * this.height])
        }))
        .sort((a, b) => (PRIORITY[a.type] || 0) - (PRIORITY[b.type] || 0))
        .map(h => ({ ...h, points: h.raw.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') }))
    },

    viewBox () {
      if (!this.crop || this.holds.length === 0) {
        return `0 0 ${this.width} ${this.height}`
      }
      const all = this.holds.flatMap(h => h.raw)
      const xs = all.map(p => p[0])
      const ys = all.map(p => p[1])
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)

      // carré centré sur le bloc, avec marge, et un plancher pour ne pas sur-zoomer un bloc de 1 prise
      const size = Math.max(maxX - minX, maxY - minY, this.width * 0.15) * 1.2
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      return `${(cx - size / 2).toFixed(1)} ${(cy - size / 2).toFixed(1)} ${size.toFixed(1)} ${size.toFixed(1)}`
    }
  }
}
</script>

<style lang="scss">
.spray-wall-route-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  .spray-wall-hold-start {
    fill: #FFEB3B;
    stroke: #FFEB3B;
  }
  .spray-wall-hold-middle {
    fill: rgb(50, 50, 50);
    stroke: rgb(50, 50, 50);
  }
  .spray-wall-hold-foot {
    fill: #00E676;
    stroke: #00E676;
  }
  .spray-wall-hold-top {
    fill: #FF1744;
    stroke: #FF1744;
  }
}
.theme--dark {
  .spray-wall-route-avatar {
    .spray-wall-hold-start {
      fill: #FFFF00;
      stroke: #FFFF00;
    }
    .spray-wall-hold-middle {
      fill: #FFFFFF;
      stroke: #FFFFFF;
    }
  }
}
</style>
