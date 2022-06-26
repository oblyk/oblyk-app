<template>
  <div
    class="compass-container"
    :style="`height: ${size}; width: ${size};`"
    :title="title"
  >
    <div class="svg-compass-container">
      <svg
        viewBox="0 0 6.3499998 6.3501596"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
      >
        <g transform="translate(-103.36682,-110.34313)">
          <g transform="matrix(0.30985702,0,0,0.30985702,71.337882,76.152539)">
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('north') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 429.37305,417.04492 -7.72266,30.97461 4.05273,4.05274 a 5.1924534,5.1924534 0 0 1 3.66993,-1.52344 5.1924534,5.1924534 0 0 1 3.67187,1.52148 l 4.04883,-4.05078 z"
              transform="scale(0.26458333)"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('east') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 437.09375,448.01953 -4.04883,4.05078 a 5.1924534,5.1924534 0 0 1 1.51953,3.66992 5.1924534,5.1924534 0 0 1 -1.52343,3.66993 l 4.05273,4.05273 31.03906,-7.7207 z"
              transform="scale(0.26458333)"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('south') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 425.70508,459.41016 -4.04102,4.04101 7.70899,31.05078 7.7207,-31.03906 -4.05273,-4.05273 a 5.1924534,5.1924534 0 0 1 -3.66797,1.52343 5.1924534,5.1924534 0 0 1 -3.66797,-1.52343 z"
              transform="scale(0.26458333)"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('west') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 421.65039,448.01953 -30.97266,7.72266 30.97266,7.7207 4.05469,-4.05273 a 5.1924534,5.1924534 0 0 1 -1.52539,-3.66993 5.1924534,5.1924534 0 0 1 1.52343,-3.66796 z"
              transform="scale(0.26458333)"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('north_east') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 122.6649,111.52151 -7.04971,4.21905 0.56487,2.26579 2.26672,0.5658 z"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('north_west') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 104.54486,111.52151 7.04971,4.21905 -0.56487,2.26579 -2.26672,0.5658 z"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('south_west') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 104.54486,129.64155 7.04971,-4.21905 -0.56487,-2.26579 -2.26672,-0.5658 z"
            />
            <path
              style="stroke:none;"
              :style="`fill:${orientations.includes('south_east') ? '#31994e' : 'rgba(0,0,0,0.20)'}`"
              d="m 122.6649,129.64155 -7.04971,-4.21905 0.56487,-2.26579 2.26672,-0.5658 z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Compass',

  props: {
    size: {
      type: String,
      default: '1.8em'
    },
    orientations: {
      type: Array,
      required: true
    }
  },

  computed: {
    title () {
      const titles = []
      for (const orientation of this.orientations) {
        titles.push(this.$t(`models.orientations.${orientation}`))
      }
      return titles.join(', ')
    }
  }
}
</script>

<style lang="scss">
.compass-container {
  vertical-align: middle;
  display: inline-block;
  .svg-compass-container {
    vertical-align: baseline;
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    transition: transform 0.2s;
    svg {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }
    &:hover {
      transform: scale(175%);
    }
  }
}
</style>
