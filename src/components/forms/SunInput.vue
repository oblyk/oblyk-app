<template>
  <v-select
    v-model="sun"
    :items="suns"
    item-text="text"
    item-value="value"
    :label="$t('components.input.sun')"
    outlined
    v-disabled-icon-focus
    clearable
    ref="sunInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'SunInput',
  mixins: [InputHelpers],
  props: {
    value: String
  },

  data () {
    return {
      suns: [
        { text: this.$t('models.suns.sunny_all_day'), value: 'sunny_all_day' },
        { text: this.$t('models.suns.shady'), value: 'shady' },
        { text: this.$t('models.suns.sunny_afternoon'), value: 'sunny_afternoon' },
        { text: this.$t('models.suns.sunny_morning'), value: 'sunny_morning' }
      ],
      sun: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.sun)
    },

    onFocus: function () {
      this.$refs.sunInput.isMenuActive = true
    }
  }
}
</script>
