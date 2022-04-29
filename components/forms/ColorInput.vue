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
    <template #selection="{ attrs, item, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
      >
        <v-icon left :style="`color: ${item.value}`">
          {{ mdiCircle }}
        </v-icon>
        {{ item.text }}
      </v-chip>
    </template>
  </v-select>
</template>

<script>
import { mdiCircle } from '@mdi/js'
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
      mdiCircle,
      selectedColors: this.value
    }
  },

  watch: {
    value () {
      this.selectedColors = this.value
    }
  },

  methods: {
    change () {
      this.$emit('input', this.selectedColors)
    }
  }
}
</script>
