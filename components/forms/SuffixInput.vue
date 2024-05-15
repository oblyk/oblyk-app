<template>
  <v-text-field
    v-model="unPrefixedValue"
    :prepend-icon="prependIcon"
    :label="label"
    type="number"
    :suffix="suffix"
    outlined
    :hide-details="hideDetails"
    :dense="dense"
    @input="onChange"
  />
</template>
<script>

export default {
  name: 'SuffixInput',
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: 'mm'
    },
    dense: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      unPrefixedValue: this.value?.replace(this.suffix, '')?.trim()
    }
  },

  methods: {
    onChange () {
      this.$emit('input', `${this.unPrefixedValue}${this.suffix}`)
    }
  }
}
</script>
