<template>
  <div style="position: relative">
    <v-avatar
      class="my-0"
      style="border-radius: 50% 50% 20px 50%"
      :style="circleColor()"
      :size="size"
    >
      <v-img
        class="sheet-background-color"
        :max-width="size - 10"
        :max-height="size - 10"
        contain
        :src="imageVariant(gymRoute.attachments.thumbnail, { fit: 'crop', height: 100, width: 100 })"
      />
    </v-avatar>
    <v-sheet
      style="position: absolute; right: 0; bottom: 0; border-radius: 50%; padding: 3px"
      :style="smallCircleColor()"
    >
      <v-sheet style="border-radius: 50%; height: 25px; width: 25px; padding: 4px" class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-content" preserveAspectRatio="xMinYMin meet">
          <defs>
            <linearGradient
              v-if="!allColorsStop"
              :id="`${gymRoute.id}-hold-gradiant`"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                v-for="(holdColor, indexColor) in holdOrTagColors()"
                :key="`gym-route-hold-index--${indexColor}`"
                :offset="`${holdColor.offset}%`"
                :style="`stop-color:${holdColor.color};stop-opacity:1`"
              />
            </linearGradient>
            <linearGradient
              v-else
              :id="`${gymRoute.id}-hold-gradiant`"
            >
              <stop style="stop-color:#ff0000;stop-opacity:1" offset="0" />
              <stop style="stop-color:#ff7000;stop-opacity:1;" offset="0.15507609" />
              <stop style="stop-color:#ffcc00;stop-opacity:1" offset="0.32632306" />
              <stop style="stop-color:#71c837;stop-opacity:1" offset="0.51453418" />
              <stop style="stop-color:#0066ff;stop-opacity:1" offset="0.70757306" />
              <stop style="stop-color:#0044aa;stop-opacity:1" offset="0.83874756" />
              <stop style="stop-color:#892ca0;stop-opacity:1" offset="1" />
            </linearGradient>
          </defs>
          <path
            v-if="showHold"
            :style="`fill:url(#${gymRoute.id}-hold-gradiant)`"
            d="M7.2,11.2C8.97,11.2 10.4,12.63 10.4,14.4C10.4,16.17 8.97,17.6 7.2,17.6C5.43,17.6 4,16.17 4,14.4C4,12.63 5.43,11.2 7.2,11.2M14.8,16A2,2 0 0,1 16.8,18A2,2 0 0,1 14.8,20A2,2 0 0,1 12.8,18A2,2 0 0,1 14.8,16M15.2,4A4.8,4.8 0 0,1 20,8.8C20,11.45 17.85,13.6 15.2,13.6A4.8,4.8 0 0,1 10.4,8.8C10.4,6.15 12.55,4 15.2,4Z"
          />
          <path
            v-if="showTag"
            :style="`fill:url(#${gymRoute.id}-hold-gradiant)`"
            d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
          />
        </svg>
      </v-sheet>
    </v-sheet>
  </div>
</template>
<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymRouteAvatar',
  mixins: [ImageVariantHelpers],
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 72
    }
  },

  computed: {
    showTag () {
      return !this.gymRoute.hold_colors?.length > 0 && this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0
    },

    showHold () {
      return this.gymRoute.hold_colors && this.gymRoute.hold_colors.length > 0
    },

    allColorsStop () {
      return this.showHold && this.gymRoute.hold_colors[0] === '#00000000'
    }
  },

  methods: {
    circleColor () {
      if (this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0) {
        return this.buildCssGradiant(this.gymRoute.tag_colors)
      } else if (this.gymRoute.hold_colors && this.gymRoute.hold_colors.length > 0) {
        return this.buildCssGradiant(this.gymRoute.hold_colors)
      } else {
        return null
      }
    },

    smallCircleColor () {
      let color = null
      if (this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0) {
        const firstColor = this.gymRoute.tag_colors[this.gymRoute.tag_colors.length - 1]
        if (firstColor === '#00000000') {
          return 'background: linear-gradient(to right, #009fff 0%, blue 33%, #f0f 66%, red 100%);'
        } else {
          color = firstColor
        }
      } else if (this.gymRoute.hold_colors && this.gymRoute.hold_colors.length > 0) {
        const firstColor = this.gymRoute.hold_colors[this.gymRoute.hold_colors.length - 1]
        if (firstColor === '#00000000') {
          return 'background: linear-gradient(to right, #009fff 0%, blue 33%, #f0f 66%, red 100%);'
        } else {
          color = firstColor
        }
      } else {
        color = '#00000000'
      }
      return `background-color: ${color}`
    },

    holdOrTagColors () {
      const colors = this.showTag ? this.gymRoute.tag_colors : this.gymRoute.hold_colors
      if (colors && colors.length > 0) {
        return this.buildStopGradiant(colors, this.showHold)
      }
    },

    buildCssGradiant (colors) {
      if (colors.length === 1 && colors[0] === '#00000000') {
        return 'background: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);'
      }

      const numberOfColor = colors.length
      const gradiant = []
      if (numberOfColor === 1) {
        gradiant.push({ color: colors[0], offset: 0 })
        gradiant.push({ color: colors[0], offset: 100 })
      } else {
        let index = 0
        for (const color of colors) {
          gradiant.push({ color, offset: 100 / numberOfColor * index })
          gradiant.push({ color, offset: 100 / numberOfColor * (index + 1) })
          index++
        }
      }
      const gradiantColors = []
      for (const colorAndOffset of gradiant) {
        gradiantColors.push(`${colorAndOffset.color} ${colorAndOffset.offset}%`)
      }
      return `background: linear-gradient(135deg, ${gradiantColors.join(', ')});`
    },

    buildStopGradiant (colors, fluid = true) {
      const numberOfColor = colors.length
      const gradiant = []
      if (numberOfColor === 1) {
        gradiant.push({ color: colors[0], offset: 0 })
        gradiant.push({ color: colors[0], offset: 100 })
      } else {
        let index = 0
        for (const color of colors) {
          if (fluid) {
            gradiant.push({ color, offset: 100 / (numberOfColor - 1) * index })
          } else {
            gradiant.push({ color, offset: 100 / numberOfColor * index })
            gradiant.push({ color, offset: 100 / numberOfColor * (index + 1) })
          }
          index++
        }
      }
      return gradiant
    }
  }
}
</script>
