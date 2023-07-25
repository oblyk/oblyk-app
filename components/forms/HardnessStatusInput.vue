<template>
  <v-select
    ref="hardnessStatusInput"
    v-model="hardnessStatus"
    v-disabled-icon-focus
    :items="hardnessStatuses"
    item-text="text"
    item-value="value"
    :label="$t(labelKey)"
    outlined
    :prepend-inner-icon="mdiNumeric7BoxMultipleOutline"
    clearable
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { mdiNumeric7BoxMultipleOutline } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'HardnessStatusInput',
  mixins: [InputHelpers],
  props: {
    value: String,
    labelKey: {
      type: String,
      default: 'components.input.hardnessStatus'
    }
  },

  data () {
    return {
      hardnessStatuses: [
        { text: this.$t('models.hardnessStatus.easy_for_the_grade'), value: 'easy_for_the_grade' },
        { text: this.$t('models.hardnessStatus.this_grade_is_accurate'), value: 'this_grade_is_accurate' },
        { text: this.$t('models.hardnessStatus.sandbagged'), value: 'sandbagged' }
      ],
      hardnessStatus: this.value,

      mdiNumeric7BoxMultipleOutline
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.hardnessStatus)
    },

    onFocus () {
      this.$refs.hardnessStatusInput.isMenuActive = true
    }
  }
}
</script>
