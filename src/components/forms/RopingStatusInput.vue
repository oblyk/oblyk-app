<template>
  <v-select
    v-model="ropingStatus"
    :items="ropingStatuses"
    item-text="text"
    item-value="value"
    :label="$t('components.input.ropingStatus')"
    outlined
    clearable
    v-disabled-icon-focus
    ref="ropingStatusInput"
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'RopingStatusInput',
  mixins: [InputHelpers],
  props: {
    value: String
  },

  data () {
    return {
      ropingStatuses: [
        { text: this.$t('models.ropingStatus.lead_climb'), value: 'lead_climb' },
        { text: this.$t('models.ropingStatus.top_rope'), value: 'top_rope' },
        { text: this.$t('models.ropingStatus.multi_pitch_leader'), value: 'multi_pitch_leader' },
        { text: this.$t('models.ropingStatus.multi_pitch_second'), value: 'multi_pitch_second' },
        { text: this.$t('models.ropingStatus.multi_pitch_alternate_lead'), value: 'multi_pitch_alternate_lead' }
      ],
      ropingStatus: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.ropingStatus)
    },

    onFocus: function () {
      this.$refs.ropingStatusInput.isMenuActive = true
    }
  }
}
</script>
