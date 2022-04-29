<template>
  <v-select
    ref="startInput"
    v-model="start"
    v-disabled-icon-focus
    :items="starts"
    item-text="text"
    item-value="value"
    :prepend-inner-icon="mdiArrowExpandUp"
    :label="$t('components.input.startType')"
    outlined
    :tabindex="tabindex"
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiArrowExpandUp } from '@mdi/js'
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
      mdiArrowExpandUp,
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
    onChange () {
      this.$emit('input', this.start)
    },

    onFocus () {
      this.$refs.startInput.isMenuActive = true
    }
  }
}
</script>
