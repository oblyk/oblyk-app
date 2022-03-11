<template>
  <v-select
    ref="receptionInput"
    v-model="reception"
    v-disabled-icon-focus
    :items="receptions"
    item-text="text"
    item-value="value"
    :prepend-inner-icon="mdiSelectionEllipseArrowInside"
    :label="$t('components.input.receptionType')"
    outlined
    :tabindex="tabindex"
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiSelectionEllipseArrowInside } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'ReceptionInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    tabindex: Number
  },

  data () {
    return {
      mdiSelectionEllipseArrowInside,
      receptions: [
        { text: this.$t('models.receptionType.good'), value: 'good' },
        { text: this.$t('models.receptionType.correct'), value: 'correct' },
        { text: this.$t('models.receptionType.bad'), value: 'bad' },
        { text: this.$t('models.receptionType.dangerous'), value: 'dangerous' }
      ],
      reception: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.reception)
    },

    onFocus () {
      this.$refs.receptionInput.isMenuActive = true
    }
  }
}
</script>
