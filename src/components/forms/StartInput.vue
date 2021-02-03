<template>
  <v-select
    v-model="start"
    :items="starts"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-arrow-expand-up"
    :label="$t('components.input.startType')"
    outlined
    :tabindex="tabindex"
    v-disabled-icon-focus
    clearable
    ref="startInput"
    @change="onChange"
    @focus="onFocus"
  ></v-select>
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'StartInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    tabindex: Number
  },

  data () {
    return {
      starts: [
        { text: this.$t('models.startType.sit'), value: 'sit' },
        { text: this.$t('models.startType.down'), value: 'down' },
        { text: this.$t('models.startType.stand'), value: 'stand' },
        { text: this.$t('models.startType.jump'), value: 'jump' },
        { text: this.$t('models.startType.run_and_jump'), value: 'run_and_jump' }
      ],
      start: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.start)
    },

    onFocus: function () {
      this.$refs.startInput.isMenuActive = true
    }
  }
}
</script>
