<template>
  <v-select
    ref="sunInput"
    v-model="sun"
    v-disabled-icon-focus
    :items="suns"
    item-text="text"
    item-value="value"
    :label="$t('components.input.sun')"
    outlined
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'SunInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      default: null
    }
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
    onChange () {
      this.$emit('input', this.sun)
    },

    onFocus () {
      this.$refs.sunInput.isMenuActive = true
    }
  }
}
</script>
