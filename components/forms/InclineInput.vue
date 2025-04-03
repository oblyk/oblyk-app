<template>
  <v-select
    ref="inclineInput"
    v-model="incline"
    v-disabled-icon-focus
    :items="inclines"
    item-text="text"
    item-value="value"
    :prepend-inner-icon="mdiAngleAcute"
    :label="$t('components.input.inclineType')"
    outlined
    :tabindex="tabindex"
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiAngleAcute } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'InclineInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      required: true
    },
    tabindex: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      mdiAngleAcute,
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
    onChange () {
      this.$emit('input', this.incline)
    },

    onFocus () {
      this.$refs.inclineInput.isMenuActive = true
    }
  }
}
</script>
