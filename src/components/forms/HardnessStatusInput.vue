<template>
  <v-select
    v-model="hardnessStatus"
    :items="hardnessStatuses"
    item-text="text"
    item-value="value"
    :label="$t('components.input.hardnessStatus')"
    outlined
    prepend-inner-icon="mdi-numeric-7-box-multiple-outline"
    clearable
    v-disabled-icon-focus
    ref="hardnessStatusInput"
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'HardnessStatusInput',
  mixins: [InputHelpers],
  props: {
    value: String
  },

  data () {
    return {
      hardnessStatuses: [
        { text: this.$t('models.hardnessStatus.easy_for_the_grade'), value: 'easy_for_the_grade' },
        { text: this.$t('models.hardnessStatus.this_grade_is_accurate'), value: 'this_grade_is_accurate' },
        { text: this.$t('models.hardnessStatus.sandbagged'), value: 'sandbagged' }
      ],
      hardnessStatus: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.hardnessStatus)
    },

    onFocus: function () {
      this.$refs.hardnessStatusInput.isMenuActive = true
    }
  }
}
</script>
