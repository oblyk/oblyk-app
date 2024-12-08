<template>
  <svg
    class="oblyk-svg-logo"
    :class="animate ? '--animate' : ''"
    viewBox="0 0 10.054166 10.054166"
    height="38"
    width="38"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 4.4298964,4.2390636 6.4357839,2.2107931 9.2531882,5.0281974 6.4357839,7.8456017 2.6792446,4.0890607 0.80097503,5.9673303 2.6792446,7.8456017 3.7579684,6.7668798"
      style="fill:none;fill-rule:evenodd;stroke-width:1.13275;stroke-linecap:butt;stroke-miterlimit:4;stroke-opacity:1"
      :style="`stroke:${color};stroke-linejoin:${strokeLinejoin}`"
    />
  </svg>
</template>
<script>
export default {
  name: 'AnimateOblykLogo',
  props: {
    animate: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      default: '#31994e'
    },
    strokeLinejoin: {
      type: String,
      default: 'miter'
    }
  }
}
</script>
<style lang="scss" scoped>
.oblyk-svg-logo {
  margin-top: 5px;
  margin-right: 8px;
  margin-left: 3px;
  path { will-change: stroke-dashoffset; }
  &.--animate {
    path {
      animation: draw_oblyk_logo 1.7s linear infinite;
      stroke-dasharray: 20 4;
    }
  }
}
@keyframes draw_oblyk_logo {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 24px;
  }
}
</style>
