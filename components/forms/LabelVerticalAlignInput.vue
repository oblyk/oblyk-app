<template>
  <v-input :prepend-icon="prependIcon">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Position des étiquettes sur la page
      </legend>
      <div class="d-flex">
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="vertical === 'start' ? '--active' : null"
          @click="selectVertical('start')"
        >
          <v-img
            contain
            src="/svg/vertical_aligns/start.svg"
            height="80"
            width="60"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="vertical === 'center' ? '--active' : null"
          @click="selectVertical('center')"
        >
          <v-img
            contain
            src="/svg/vertical_aligns/center.svg"
            height="80"
            width="60"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="vertical === 'end' ? '--active' : null"
          @click="selectVertical('end')"
        >
          <v-img
            contain
            src="/svg/vertical_aligns/end.svg"
            height="80"
            width="60"
          />
        </v-sheet>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  name: 'LabelVerticalAlignInput',
  props: {
    value: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      vertical: this.value,

      mdiClose
    }
  },

  methods: {
    selectVertical (style) {
      this.vertical = style
      this.$emit('input', this.vertical)
    }
  }
}
</script>
