<template>
  <v-select
    ref="fundingStatusInput"
    v-model="fundingStatus"
    v-disabled-icon-focus
    :items="fundingStatuses"
    item-text="text"
    item-value="value"
    :hide-details="hideDetails"
    :label="$t('components.input.foundingStatus')"
    outlined
    :dense="dense"
    clearable
    @focus="onFocus"
    @change="onChange"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'FundingStatusInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      default: null
    },
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
      fundingStatuses: [
        { text: this.$t('models.fundingStatusType.contributes_to_financing'), value: 'contributes_to_financing' },
        { text: this.$t('models.fundingStatusType.not_contributes_to_financing'), value: 'not_contributes_to_financing' },
        { text: this.$t('models.fundingStatusType.undefined'), value: 'undefined' }
      ],
      fundingStatus: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.fundingStatus)
    },

    onFocus () {
      this.$refs.fundingStatusInput.isMenuActive = true
    }
  }
}
</script>
