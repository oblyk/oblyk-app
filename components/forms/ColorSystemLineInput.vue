<template>
  <div>
    <v-sheet
      v-for="(colorLine, colorLineIndex) in colorsSystem.color_system_lines"
      :key="`ascent-color-index-${colorLineIndex}`"
      rounded
      class="activable-v-sheet d-inline-block rounded-pill mr-1"
      :class="colorLine.id === colorLineId ? '--active' : '--inactive'"
      @click="onSelect(colorLine.id)"
    >
      <v-icon
        :style="colorLineId && colorLine.id !== colorLineId ? 'opacity: 0.5' : ''"
        :color="colorLine.hex_color"
      >
        {{ mdiCircle }}
      </v-icon>
    </v-sheet>
  </div>
</template>

<script>
import { mdiCircle } from '@mdi/js'

export default {
  name: 'ColorSystemLineInput',
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    colorsSystem: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      colorLineId: this.value,

      mdiCircle
    }
  },

  methods: {
    onSelect (colorLineId) {
      this.colorLineId = colorLineId
      this.$emit('input', this.colorLineId)
    }
  }
}
</script>
