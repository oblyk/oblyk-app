<template>
  <v-avatar
    ref="gymSectorSvgAvatar"
    class="gym-sector-svg-avatar"
    :size="size"
    tile
    v-html="gymSector.gym_space.svg_sectors"
  />
</template>
<script>

export default {
  name: 'GymSectorAvatar',
  props: {
    gymSector: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 40
    }
  },

  mounted () {
    if (this.gymSector.gym_space.svg_sectors) {
      const sectorPolygone = this.$refs.gymSectorSvgAvatar.$el.querySelector(`polygon#id-${this.gymSector.id}`)
      const sectorCircle = this.$refs.gymSectorSvgAvatar.$el.querySelector(`circle#id-${this.gymSector.id}`)
      sectorPolygone?.classList?.add('--highlighted')
      sectorCircle?.classList?.add('--highlighted')
    }
  }
}
</script>

<style lang="scss">
.gym-sector-svg-avatar {
  svg {
    height: 100%;
    width: 100%;
    polygon { stroke-width: 5 }
    circle { fill: rgba(150, 150, 150, 0); }
    polygon, circle {
      &.--highlighted {
        fill: red;
      }
    }
  }
}
.theme--light {
  .gym-sector-svg-avatar {
    polygon { fill: rgba(150, 150, 150, 0.2); stroke: rgba(0, 0, 0); }
  }
}
.theme--dark {
  .gym-sector-svg-avatar {
    polygon { fill: rgba(200, 200, 200, 0.2); stroke: rgba(255, 255, 255); }
  }
}
</style>
