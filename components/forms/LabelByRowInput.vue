<template>
  <v-input :prepend-icon="prependIcon">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Nombre d'étiquette par largeur de page
      </legend>
      <div class="d-flex">
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="byRow === 'one_by_row' ? '--active' : null"
          @click="selectByRow('one_by_row')"
        >
          <v-img
            contain
            src="/svg/labels_by_row/one.svg"
            height="80"
            width="60"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="byRow === 'two_by_row' ? '--active' : null"
          @click="selectByRow('two_by_row')"
        >
          <v-img
            contain
            src="/svg/labels_by_row/two.svg"
            height="80"
            width="60"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="byRow === 'three_by_row' ? '--active' : null"
          @click="selectByRow('three_by_row')"
        >
          <v-img
            contain
            src="/svg/labels_by_row/three.svg"
            height="80"
            width="80"
          />
        </v-sheet>
        <v-sheet
          class="activable-v-sheet pa-1 rounded-sm"
          :class="byRow === 'four_by_row' ? '--active' : null"
          @click="selectByRow('four_by_row')"
        >
          <v-img
            contain
            src="/svg/labels_by_row/four.svg"
            height="80"
            width="80"
          />
        </v-sheet>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
  name: 'LabelByRowInput',
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
      byRow: this.value,

      mdiClose
    }
  },

  methods: {
    selectByRow (byRow) {
      this.byRow = byRow
      this.$emit('input', this.byRow)
    }
  }
}
</script>
