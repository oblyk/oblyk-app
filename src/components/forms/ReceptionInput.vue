<template>
  <v-select
    v-model="reception"
    :items="receptions"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-selection-ellipse-arrow-inside"
    :label="$t('components.input.receptionType')"
    outlined
    v-disabled-icon-focus
    :tabindex="tabindex"
    clearable
    ref="receptionInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
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
    onChange: function () {
      this.$emit('input', this.reception)
    },

    onFocus: function () {
      this.$refs.receptionInput.isMenuActive = true
    }
  }
}
</script>
