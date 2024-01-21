<template>
  <div
    class="gym-route-picture-container"
    :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
  >
    <div id="panzoom">
      <v-img
        v-if="gymRoute.hasPicture"
        ref="gymRoutePicture"
        class="rounded gym-route-picture --full-height"
        :height="height"
        :src="gymRoute.pictureUrl"
      >
        <div
          v-if="gymRoute.thumbnail_position"
          class="gym-route-thumbnail-position"
          :style="`height: ${thbPos.h}%; width: ${thbPos.w}%; top: calc(50% - ${thbPos.dy}%); left: calc(50% - ${thbPos.dx}%)`"
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="GymRouteGradient" x1="0" x2="100%" y1="0" y2="0">
                <stop
                  v-for="(gradiant, gradiantIndex) in thumbnailGradiant"
                  :key="`gradiant-index-${gradiantIndex}`"
                  :stop-color="gradiant.color"
                  :offset="`${gradiant.offset}%`"
                />
              </linearGradient>
            </defs>
            <rect
              x="4"
              y="4"
              height="100%"
              width="100%"
              style="width:calc(100% - 8px);height:calc(100% - 8px)"
              rx="50%"
              ry="50%"
              stroke-width="8"
              fill="transparent"
              stroke="url(#GymRouteGradient)"
            />
          </svg>
        </div>
      </v-img>
    </div>
  </div>
</template>
<script>
import * as panzoom from 'panzoom'

export default {
  name: 'GymRoutePicture',
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      height: null
    }
  },

  computed: {
    thbPos () {
      if (this.gymRoute.calculated_thumbnail_position === null) {
        return null
      }

      const thbP = this.gymRoute.calculated_thumbnail_position
      return {
        h: thbP.h,
        w: thbP.w,
        dx: thbP.delta_x,
        dy: thbP.delta_y
      }
    },

    thumbnailGradiant () {
      if (this.gymRoute.calculated_thumbnail_position === null) {
        return null
      }

      const colors = this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0 ? this.gymRoute.tag_colors : this.gymRoute.hold_colors
      const numberOfColor = colors.length
      const gradiant = []
      if (numberOfColor === 1) {
        gradiant.push({
          color: colors[0],
          offset: 0
        })
        gradiant.push({
          color: colors[0],
          offset: 1
        })
      } else {
        let index = 0
        for (const color of colors) {
          gradiant.push({
            color,
            offset: 100 / (numberOfColor - 1) * index
          })
          index++
        }
      }
      return gradiant
    }
  },

  mounted () {
    const image = document.querySelector('#panzoom')
    this.panzoom = panzoom(image, {
      minZoom: 1
    })
    this.panzoom.on('transform', this.recenterImage)
    image.addEventListener('touchend', this.resteZoom)
    image.addEventListener('pointerleave', this.resteZoom)
    this.initialTransform = { ...this.panzoom.getTransform() }
    if (this.gymRoute.hasPicture) {
      this.height = image.offsetWidth * (this.gymRoute.cover_metadata.height / this.gymRoute.cover_metadata.width)
    }
  },

  methods: {
    recenterImage () {
      const transform = { ...this.panzoom.getTransform() }
      if (transform.scale === 1) {
        this.panzoom.moveTo(0, 0)
      }
    },

    resteZoom () {
      const xys = this.panzoom.getTransform()
      if (xys.scale > 1) {
        const fScale = 1 - xys.scale
        const fixeX = xys.x / fScale
        const fixeY = xys.y / fScale
        this.panzoom.smoothZoomAbs(fixeX, fixeY, 1)
      } else {
        this.panzoom.moveBy(-xys.x, -xys.y, true)
        this.panzoom.smoothZoomAbs(xys.x, xys.y, 1)
      }
    }
  }
}
</script>
<style lang="scss">
.gym-route-picture-container {
  position: relative;
  z-index: 1;
  .gym-route-thumbnail-position {
    box-sizing: border-box;
    position: absolute;
    border-color: rgba(255, 255, 255, 0.5);
    border-width: 2px;
    border-radius: 50%;
    border-style: solid;
    svg {
      opacity: 0.5;
      width:100%;
      height:100%;
    }
  }
}
</style>
