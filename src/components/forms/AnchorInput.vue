<template>
  <v-select
    v-model="anchor"
    :items="anchors"
    item-text="text"
    :hide-details="hideDetails"
    :dense="dense"
    item-value="value"
    prepend-inner-icon="mdi-source-fork"
    :label="$t('components.input.anchorType')"
    outlined
    v-disabled-icon-focus
    :tabindex="tabindex"
    clearable
    ref="anchorInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'AnchorInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    tabindex: Number
  },

  data () {
    return {
      anchors: [
        { text: this.$t('models.anchorType.bolted_anchor_chains'), value: 'bolted_anchor_chains' },
        { text: this.$t('models.anchorType.bolted_anchor_no_chains'), value: 'bolted_anchor_no_chains' },
        { text: this.$t('models.anchorType.pigtail_anchors'), value: 'pigtail_anchors' },
        { text: this.$t('models.anchorType.traditional_anchor'), value: 'traditional_anchor' },
        { text: this.$t('models.anchorType.no_anchor'), value: 'no_anchor' }
      ],
      anchor: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.anchor)
    },

    onFocus: function () {
      this.$refs.anchorInput.isMenuActive = true
    }
  }
}
</script>
