<template>
  <div
    class="tag-and-hold-gym-route"
    :style="`width: ${size}px`"
  >
    <div class="svg-container">
      <svg
        preserveAspectRatio="xMinYMin meet"
        class="svg-content"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            v-if="haveHold"
            :id="`${gymRoute.id}-hold-gradiant`"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              v-for="(holdColor, indexColor) in holdColors"
              :key="`gym-route-hold-index--${indexColor}`"
              :offset="`${holdColor.offset}%`"
              :style="`stop-color:${holdColor.color};stop-opacity:1`"
            />
          </linearGradient>
          <linearGradient
            v-if="haveTag"
            :id="`${gymRoute.id}-tag-gradiant`"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              v-for="(tagColor, indexColor) in tagColors"
              :key="`gym-route-tag-index--${indexColor}`"
              :offset="`${tagColor.offset}%`"
              :style="`stop-color:${tagColor.color};stop-opacity:1`"
            />
          </linearGradient>
          <linearGradient id="all-colors-gradiant">
            <stop style="stop-color:#ff0000;stop-opacity:1" offset="0" />
            <stop style="stop-color:#ff7000;stop-opacity:1;" offset="0.15507609" />
            <stop style="stop-color:#ffcc00;stop-opacity:1" offset="0.32632306" />
            <stop style="stop-color:#71c837;stop-opacity:1" offset="0.51453418" />
            <stop style="stop-color:#0066ff;stop-opacity:1" offset="0.70757306" />
            <stop style="stop-color:#0044aa;stop-opacity:1" offset="0.83874756" />
            <stop style="stop-color:#892ca0;stop-opacity:1" offset="1" />
          </linearGradient>
        </defs>
        <g>
          <!-- SMALL TAG -->
          <path
            v-if="haveTag && haveHold"
            d="M 14.329667,2.3146016 H 4.3170884 A 2.0025112,2.0025112 0 0 0 2.3146016,4.3171139 V 20.337191 l 7.0087762,-3.003768 7.0087772,3.003768 V 4.3171139 c 0,-1.111391 -0.901113,-2.0025123 -2.002488,-2.0025123 z"
            :style="`fill:url(#${allTagsColors ? `all-colors-gradiant` : `${gymRoute.id}-tag-gradiant`});stroke:${whiteTag ? '#777' : 'none'};stroke-width:1px`"
            class="gym-route-tag-color"
          />
          <!-- HOLD -->
          <path
            v-if="haveHold"
            d="m 9.8938828,21.648982 c 5.2016282,0 9.4040732,4.202448 9.4040732,9.404087 0,5.201626 -4.202445,9.404085 -9.4040732,9.404085 -5.2016392,0 -9.40408664,-4.202459 -9.40408664,-9.404085 0,-5.201639 4.20244744,-9.404087 9.40408664,-9.404087 M 32.228574,35.755105 a 5.8775515,5.8775515 0 0 1 5.877556,5.877556 5.8775515,5.8775515 0 0 1 -5.877556,5.877555 5.8775515,5.8775515 0 0 1 -5.877553,-5.877555 5.8775515,5.8775515 0 0 1 5.877553,-5.877556 M 33.404081,0.48979628 A 14.106124,14.106124 0 0 1 47.510204,14.595921 c 0,7.787756 -6.318366,14.106122 -14.106123,14.106122 A 14.106124,14.106124 0 0 1 19.297956,14.595921 c 0,-7.7877587 6.318367,-14.10612472 14.106125,-14.10612472 z"
            :style="`fill:url(#${allHoldsColors ? `all-colors-gradiant` : `${gymRoute.id}-hold-gradiant`});stroke:${whiteHold ? '#777' : 'none'};stroke-width:1px`"
          />
          <!-- BIG TAG -->
          <path
            v-if="haveTag && !haveHold"
            d="M 37.062687,0.48984942 H 10.937311 A 5.2250638,5.2250638 0 0 0 5.7123095,5.7149161 V 47.515394 L 23.999999,39.677795 42.28769,47.515394 V 5.7149161 c 0,-2.8999033 -2.351234,-5.22506668 -5.225003,-5.22506668 z"
            :style="`fill:url(#${allTagsColors ? `all-colors-gradiant` : `${gymRoute.id}-tag-gradiant`});stroke:${whiteTag ? '#777' : 'none'};stroke-width:1px\``"
            class="gym-route-tag-color"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GymRouteTagAndHoldV2',
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 30
    }
  },

  computed: {
    holdColors () {
      return this.buildGradiantStop(this.gymRoute.hold_colors, this.fullColors)
    },

    tagColors () {
      return this.buildGradiantStop(this.gymRoute.tag_colors, false)
    },

    haveHold () {
      return this.gymRoute.hold_colors && this.gymRoute.hold_colors.length > 0
    },

    haveTag () {
      return this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0
    },

    whiteHold () {
      return this.gymRoute.hold_colors && this.gymRoute.hold_colors.includes('#f2f2f2')
    },

    whiteTag () {
      return this.gymRoute.tag_colors && this.gymRoute.tag_colors.includes('#f2f2f2')
    },

    allHoldsColors () {
      return this.gymRoute.hold_colors && this.gymRoute.hold_colors.length === 1 && this.gymRoute.hold_colors[0] === '#00000000'
    },

    allTagsColors () {
      return this.gymRoute.tag_colors && this.gymRoute.tag_colors.length === 1 && this.gymRoute.tag_colors[0] === '#00000000'
    }
  },

  methods: {
    buildGradiantStop (colors, fluid = true) {
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

<style scoped lang="scss">
.tag-and-hold-gym-route {
  display: inline-block;
  .svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: middle;
    overflow: hidden;
    .svg-content {
      width: 100%;
      height: 100%;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.theme--dark {
  .gym-route-tag-color {
    stroke: rgb(0,0,0);
  }
}
.theme--light {
  .gym-route-tag-color {
    stroke: rgb(255,255,255);
  }
}
</style>
