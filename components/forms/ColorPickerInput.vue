<template>
  <v-dialog
    v-model="colorDialog"
    width="300"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on"
      >
        <v-icon :color="color">
          {{ mdiFormatColorFill }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t(label) }}
      </v-card-title>
      <div class="px-4">
        <v-color-picker
          v-model="color"
          dot-size="25"
          mode="hexa"
          show-swatches
          swatches-max-height="200"
          @input="onChange"
        />
      </div>
      <v-card-actions>
        <v-btn
          outlined
          text
          class="ml-auto"
          @click="colorDialog = false"
        >
          {{ $t('actions.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiFormatColorFill } from '@mdi/js'

export default {
  name: 'ColorPickerInput',
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'components.input.colorPickerInput'
    },
    prependIcon: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      colorDialog: false,
      color: this.value || '#000000',

      mdiFormatColorFill
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.color)
    }
  }
}
</script>
