<template>
  <v-input :prepend-icon="mdiCropFree">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        Marge d'impression la page (en mm)
      </legend>
      <div class="d-flex mt-1">
        <v-text-field
          v-for="index in 4"
          :key="`marge-index-${index}`"
          v-model="margins[index - 1]"
          :label="labels[index - 1]"
          type="number"
          outlined
          dense
          hide-details
          @input="onChange"
        />
      </div>
    </fieldset>
  </v-input>
</template>
<script>
import { mdiCropFree } from '@mdi/js'

export default {
  name: 'LayoutPageMarginInput',
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      margins: (this.value || '10mm 10mm 10mm 10mm').split(' ').map(marge => marge?.replace('mm', '')?.trim() || 10),
      labels: ['Haut', 'Droite', 'Bas', 'Gauche'],

      mdiCropFree
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.margins.map(marge => `${marge}mm`).join(' '))
    }
  }
}
</script>
