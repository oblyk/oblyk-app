<template>
  <v-select
    ref="noteInput"
    v-model="note"
    v-disabled-icon-focus
    :items="notes"
    item-text="text"
    item-value="value"
    :prepend-inner-icon="mdiStar"
    :label="$t('components.input.note')"
    :menu-props="{ maxHeight: 360 }"
    outlined
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiStar } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'NoteInput',
  mixins: [InputHelpers],
  props: {
    value: [String, Number]
  },

  data () {
    return {
      mdiStar,
      notes: [
        { text: this.$t('models.note.terrible'), value: 0 },
        { text: this.$t('models.note.ugly'), value: 1 },
        { text: this.$t('models.note.not_outstanding'), value: 2 },
        { text: this.$t('models.note.decent'), value: 3 },
        { text: this.$t('models.note.nice'), value: 4 },
        { text: this.$t('models.note.very_nice'), value: 5 },
        { text: this.$t('models.note.classic'), value: 6 }
      ],
      note: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.note)
    },

    onFocus () {
      this.$refs.noteInput.isMenuActive = true
    }
  }
}
</script>
