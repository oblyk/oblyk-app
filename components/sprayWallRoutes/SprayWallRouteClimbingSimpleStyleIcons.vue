<template>
  <div class="d-inline">
    <v-icon
      v-for="(style, styleIndex) in icons()"
      :key="`style-${styleIndex}`"
      class="mr-1"
      small
      :title="MC_ClimbingStylesByStyle[style].text"
    >
      {{ MC_ClimbingStylesByStyle[style].icon }}
    </v-icon>
  </div>
</template>

<script>
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'

export default {
  name: 'SprayWallRouteClimbingSimpleStyleIcons',
  mixins: [ClimbingStylesMixin],
  props: {
    sprayWallRoute: {
      type: Object,
      required: true
    }
  },

  methods: {
    icons () {
      const styles = []
      for (const style of this.sprayWallRoute.styles ?? []) {
        styles.push(style)
      }
      return [...new Set(styles)]
    }
  }
}
</script>
