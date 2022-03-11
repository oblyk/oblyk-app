<template>
  <v-select
    ref="anchorInput"
    v-model="anchor"
    v-disabled-icon-focus
    :items="anchors"
    item-text="text"
    :hide-details="hideDetails"
    :dense="dense"
    item-value="value"
    :prepend-inner-icon="mdiSourceFork"
    :label="$t('components.input.anchorType')"
    outlined
    :tabindex="tabindex"
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiSourceFork } from '@mdi/js'
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
    tabindex: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      mdiSourceFork,
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
    onChange () {
      this.$emit('input', this.anchor)
    },

    onFocus () {
      this.$refs.anchorInput.isMenuActive = true
    }
  }
}
</script>
