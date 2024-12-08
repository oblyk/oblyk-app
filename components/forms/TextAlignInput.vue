<template>
  <v-select
    v-model="textAlign"
    :items="textAlignsList"
    item-value="value"
    item-text="text"
    :label="$t('components.input.textAlign')"
    :hide-details="hideDetails"
    :dense="dense"
    outlined
    clearable
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'TextAlignInput',
  props: {
    value: {
      type: String,
      required: true
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      textAlignsList: [
        { text: this.$t('models.textAlignes.left'), value: 'left' },
        { text: this.$t('models.textAlignes.right'), value: 'right' },
        { text: this.$t('models.textAlignes.center'), value: 'center' }
      ],
      textAlign: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.textAlign)
    }
  }
}
</script>
