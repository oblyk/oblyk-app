<template>
  <v-select
    v-model="bolt"
    ref="boltInput"
    v-disabled-icon-focus
    :items="bolts"
    item-text="text"
    item-value="value"
    :hide-details="hideDetails"
    :prepend-inner-icon="mdiNut"
    :label="$t('components.input.boltType')"
    outlined
    :tabindex="tabindex"
    :dense="dense"
    clearable
    @focus="onFocus"
    @change="onChange"
  />
</template>

<script>
import { mdiNut } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'BoltInput',
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
      mdiNut,
      bolts: [
        { text: this.$t('models.boltType.forged_eye_bolts'), value: 'forged_eye_bolts' },
        { text: this.$t('models.boltType.bolt_hangers'), value: 'bolt_hangers' },
        { text: this.$t('models.boltType.open_staple_bolts'), value: 'open_staple_bolts' },
        { text: this.$t('models.boltType.staple_u_bolts'), value: 'staple_u_bolts' },
        { text: this.$t('models.boltType.no_bolts'), value: 'no_bolts' }
      ],
      bolt: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.bolt)
    },

    onFocus () {
      this.$refs.boltInput.isMenuActive = true
    }
  }
}
</script>
