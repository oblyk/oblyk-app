<template>
  <v-select
    v-model="selectedColors"
    :items="colors"
    chips
    :label="label"
    multiple
    :required="required"
    :prepend-inner-icon="icon"
    outlined
    clearable
    @input="change"
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
      >
        <v-icon left :style="`color: ${item.value}`">
          mdi-circle
        </v-icon>
        {{ item.text }}
      </v-chip>
    </template>
  </v-select>
</template>
<script>
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'

export default {
  name: 'ColorInput',
  mixins: [HoldColorsHelpers],
  props: {
    value: Array,
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      selectedColors: this.value
    }
  },

  watch: {
    value: function () {
      this.selectedColors = this.value
    }
  },

  methods: {
    change: function () {
      this.$emit('input', this.selectedColors)
    }
  }
}
</script>
