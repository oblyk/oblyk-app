<template>
  <svg
    v-if="shape"
    :viewBox="shape.viewBox"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="shape.d"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<script>
export default {
  name: 'SprayWallHoldSvg',
  props: {
    hold: {
      type: Object,
      required: true
    },
    frameRatio: {
      type: Number,
      default: 1
    },
    padding: {
      type: Number,
      default: 0
    },
    fill: {
      type: String,
      default: 'rgba(116, 58, 213, 0.3)'
    },
    stroke: {
      type: String,
      default: 'rgba(116, 58, 213, 1)'
    },
    strokeWidth: {
      type: Number,
      default: 2
    }
  },

  computed: {
    shape () {
      const points = this.hold.points
      if (!points || points.length < 2) { return null }

      const pts = points.map(([x, y]) => [x * this.frameRatio, y])

      const xs = pts.map(p => p[0])
      const ys = pts.map(p => p[1])
      const minX = Math.min(...xs)
      const minY = Math.min(...ys)
      const w = Math.max(...xs) - minX
      const h = Math.max(...ys) - minY
      const pad = Math.max(w, h) * this.padding

      return {
        viewBox: [minX - pad, minY - pad, w + pad * 2, h + pad * 2].join(' '),
        d: pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ') + 'Z'
      }
    }
  }
}
</script>
