<template>
  <v-select
    v-model="incline"
    :items="inclines"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-angle-acute"
    :label="$t('components.input.inclineType')"
    outlined
    :tabindex="tabindex"
    v-disabled-icon-focus
    clearable
    ref="inclineInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'InclineInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    tabindex: Number
  },

  data () {
    return {
      inclines: [
        { text: this.$t('models.inclineType.slab'), value: 'slab' },
        { text: this.$t('models.inclineType.vertical'), value: 'vertical' },
        { text: this.$t('models.inclineType.slight_overhang'), value: 'slight_overhang' },
        { text: this.$t('models.inclineType.overhang'), value: 'overhang' },
        { text: this.$t('models.inclineType.roof'), value: 'roof' }
      ],
      incline: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.incline)
    },

    onFocus: function () {
      this.$refs.inclineInput.isMenuActive = true
    }
  }
}
</script>
