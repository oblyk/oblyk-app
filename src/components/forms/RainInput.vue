<template>
  <v-select
    v-model="rain"
    :items="rains"
    item-text="text"
    item-value="value"
    :label="$t('components.input.rain')"
    outlined
    clearable
    v-disabled-icon-focus
    ref="rainInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'RainInput',
  mixins: [InputHelpers],
  props: {
    value: String
  },

  data () {
    return {
      rains: [
        { text: this.$t('models.rains.protected'), value: 'protected' },
        { text: this.$t('models.rains.exposed'), value: 'exposed' }
      ],
      rain: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.rain)
    },

    onFocus: function () {
      this.$refs.rainInput.isMenuActive = true
    }
  }
}
</script>
