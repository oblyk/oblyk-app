<template>
  <div
    class="gym-route-picture-container"
    :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
  >
    <div
      class="panzoom-container rounded"
      :class="panzoomContainerClass"
      @click="switchCrop"
    >
      <div
        v-if="gymRoute.hasPicture"
        id="panzoom"
      >
        <v-img
          ref="gymRoutePicture"
          class="rounded gym-route-picture"
          :min-height="height"
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
      <div
        v-if="orientation === 'portrait'"
        class="cropper-switch-banner"
      >
        <v-btn
          class="btn-copper-switch-banner"
          icon
        >
          <v-icon color="black">
            {{ fullPicture ? mdiArrowCollapse : mdiArrowExpand }}
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiArrowExpand, mdiArrowCollapse } from '@mdi/js'
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
      height: null,
      fullPicture: false,

      mdiArrowExpand,
      mdiArrowCollapse
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

    orientation () {
      if (this.gymRoute.cover_metadata.height >= this.gymRoute.cover_metadata.width) {
        return 'portrait'
      } else {
        return 'landscape'
      }
    },

    panzoomContainerClass () {
      let cropAlign = '--cropped-center'
      if (this.gymRoute.thumbnail_position && this.thbPos.dy < -10) {
        cropAlign = '--cropped-end'
      } else if (this.gymRoute.thumbnail_position && this.thbPos.dy > 20) {
        cropAlign = '--cropped-start'
      }
      return this.fullPicture || this.orientation === 'landscape' ? '--full' : `${cropAlign} --cropped`
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
      minZoom: 1,
      onTouch: (e) => {
        if (e.touches.length !== 2) {
          return false
        } else {
          e.stopPropagation()
          e.preventDefault()
        }
      }
    })
    this.panzoom.on('transform', this.recenterImage)
    image.addEventListener('touchend', this.resteZoom)
    image.addEventListener('pointerleave', this.resteZoom)
    this.initialTransform = { ...this.panzoom.getTransform() }
    if (this.orientation === 'portrait') {
      this.height = 350
      this.panzoom.pause()
    } else {
      this.height = image.offsetWidth * (this.gymRoute.cover_metadata.height / this.gymRoute.cover_metadata.width)
    }
  },

  methods: {
    recenterImage () {
      const transform = { ...this.panzoom.getTransform() }
      if (transform.scale <= 1.1) {
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
    },

    switchCrop () {
      if (this.orientation === 'landscape') {
        return false
      }

      if (this.fullPicture) {
        this.panzoom.pause()
        this.fullPicture = false
      } else {
        this.panzoom.resume()
        this.fullPicture = true
      }
    }
  }
}
</script>
<style lang="scss">
.gym-route-picture-container {
  position: relative;
  z-index: 1;
  .gym-route-picture {
    background-color: rgba(150, 150, 150, 0.5);
  }
  .btn-copper-switch-banner {
    background-color: white;
  }
  .panzoom-container {
    position: relative;
    &.--cropped {
      max-height: 350px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      &.--cropped-start {
        justify-content: start;
      }
      &.--cropped-center {
        justify-content: center;
      }
      &.--cropped-end {
        justify-content: end;
      }
    }
    .cropper-switch-banner {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
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
