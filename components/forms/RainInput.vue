<template>
  <v-select
    ref="rainInput"
    v-model="rain"
    v-disabled-icon-focus
    :items="rains"
    item-text="text"
    item-value="value"
    :label="$t('components.input.rain')"
    outlined
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'RainInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      required: true
    }
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
    onChange () {
      this.$emit('input', this.rain)
    },

    onFocus () {
      this.$refs.rainInput.isMenuActive = true
    }
  }
}
</script>
