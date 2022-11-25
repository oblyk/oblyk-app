<template>
  <div
    class="tag-and-hold-gym-route"
    :style="`width: ${size}px`"
  >
    <div class="svg-container">
      <svg
        preserveAspectRatio="xMinYMin meet"
        class="svg-content"
        viewBox="0 0 29.999996 31.464937"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient :id="`${gymRoute.id}-hold-gradiant`" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              v-for="(holdColor, indexColor) in holdColors"
              :key="`gym-route-hold-index--${indexColor}`"
              :offset="`${holdColor.offset}%`"
              :style="`stop-color:${holdColor.color};stop-opacity:1`"
            />
          </linearGradient>
          <linearGradient
            v-if="gymRoute.tag_colors"
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
        </defs>
        <g transform="translate(-6.2826004,-2.7284437)">
          <path
            v-if="gymRoute.hold_colors"
            :style="`fill:url(#${gymRoute.id}-hold-gradiant);fill-opacity:1;stroke:none;stroke-width:0.0530205px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1`"
            d="M 23.707131,2.7285245 C 20.764505,2.715079 17.62354,4.5213969 15.07389,4.8152774 11.765921,5.1965617 8.9492903,6.21941 8.0876007,8.2877087 5.8511022,13.655915 5.9781195,20.806644 6.937717,22.426692 c 1.6270764,2.746921 2.6665989,4.063406 4.939922,5.586835 1.752985,1.174734 4.700314,2.855687 8.713186,3.022585 3.580596,0.148919 6.386349,-3.959899 7.719983,-6.969404 C 29.520041,21.337915 30.862457,14.008731 29.4959,9.1507399 28.893156,7.0080415 28.841419,4.5146681 26.114907,3.2410209 25.339405,2.8787586 24.531066,2.7322898 23.707131,2.7285245 Z M 18.629687,13.281268 c 1.42752,-6e-6 2.584759,1.157231 2.584753,2.584753 6e-6,1.42752 -1.157233,2.584757 -2.584753,2.584751 -1.427483,-5e-5 -2.584659,-1.157269 -2.584653,-2.584751 -6e-6,-1.427484 1.15717,-2.584703 2.584653,-2.584753 z"
          />
          <path
            v-if="gymRoute.hold_colors"
            style="fill:#ffffff;fill-opacity:0.10;stroke:none"
            d="m 23.92781,2.7344283 c -0.07348,-0.0027 -0.14693,-0.00561 -0.220679,-0.00591 C 20.764505,2.715076 17.62354,4.5213939 15.07389,4.8152744 11.765921,5.1965587 8.9492903,6.219407 8.0876007,8.2877057 5.8580322,13.63928 5.9774458,20.761723 6.9289139,22.410846 7.2983014,21.78897 7.6697133,21.1803 8.0437962,20.589612 8.4404411,19.963291 8.839618,19.353969 9.2412126,18.760504 c 0.4015927,-0.593459 0.8056094,-1.17106 1.2118094,-1.733937 0.4062,-0.562875 0.814601,-1.111044 1.225065,-1.645602 0.410463,-0.534559 0.823002,-1.055496 1.237388,-1.564007 0.414388,-0.50851 0.830606,-1.004606 1.248572,-1.489336 0.417969,-0.484729 0.837619,-0.95808 1.258827,-1.4213 0.421205,-0.463226 0.84404,-0.9163273 1.268145,-1.3603107 0.4241,-0.4439845 0.849562,-0.8788265 1.27622,-1.3058394 C 18.393897,7.813162 18.821733,7.3939741 19.250605,6.9816601 19.67948,6.5693471 20.109338,6.16383 20.540084,5.7639463 20.970828,5.3640656 21.402464,4.9698185 21.834739,4.5800975 22.267014,4.1903775 22.69997,3.8052108 23.133431,3.423381 23.39776,3.1905407 23.663141,2.9650089 23.92781,2.7344253 Z"
          />
          <path
            v-if="gymRoute.hold_colors"
            style="fill:#ffffff;fill-opacity:0.40;stroke:none"
            d="m 29.71264,10.04919 c -0.03927,0.216418 -0.07531,0.435886 -0.115981,0.650952 -0.11646,0.615745 -0.238834,1.225969 -0.367312,1.830245 -0.128479,0.604274 -0.263051,1.202626 -0.40418,1.794831 -0.141126,0.592196 -0.288808,1.178232 -0.443216,1.757751 -0.15441,0.579526 -0.315596,1.152476 -0.483918,1.718713 -0.16832,0.566246 -0.343714,1.125766 -0.52658,1.678123 -0.182866,0.552358 -0.373171,1.09759 -0.571216,1.635456 -0.198039,0.537872 -0.403859,1.068353 -0.617707,1.591136 -0.213852,0.522784 -0.435782,1.037861 -0.666072,1.54495 -0.230289,0.507088 -0.468935,1.006208 -0.716295,1.496998 -0.247361,0.490795 -0.503425,0.973299 -0.768488,1.447197 -0.132532,0.236943 -0.267309,0.471777 -0.404386,0.704383 -0.137075,0.232612 -0.276457,0.462939 -0.418158,0.691134 -0.141699,0.228195 -0.285737,0.454168 -0.432138,0.677872 -0.146401,0.22371 -0.295142,0.445167 -0.446325,0.664311 -0.151184,0.219143 -0.304781,0.436034 -0.460824,0.650541 -0.0945,0.129905 -0.191682,0.25725 -0.287988,0.385433 3.105298,-0.548859 5.520991,-4.176609 6.728952,-6.902508 1.136785,-2.565309 2.390958,-9.19607 1.401832,-14.017518 z"
          />
          <path
            v-if="gymRoute.tag_colors"
            d="m 33.56112,16.313219 -9.196968,0.0074 a 1.8393959,1.8393959 0 0 0 -1.837934,1.840882 l 0.01176,14.715155 6.435668,-2.76424 6.440113,2.753947 -0.01178,-14.715152 c -7.31e-4,-1.020908 -0.829208,-1.83878 -1.840879,-1.837972 z"
            :style="`fill:url(#${gymRoute.id}-tag-gradiant);stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none`"
            class="gym-route-tag-color"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GymRouteTagAndHold',
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
      return this.buildGradiantStop(this.gymRoute.hold_colors)
    },

    tagColors () {
      return this.buildGradiantStop(this.gymRoute.tag_colors, false)
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
