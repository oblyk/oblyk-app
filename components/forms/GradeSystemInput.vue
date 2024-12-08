<template>
  <v-select
    ref="gradeSystemInput"
    v-model="gradeSystem"
    v-disabled-icon-focus
    :items="rankingItems"
    item-text="text"
    item-value="value"
    :label="$t('components.input.gradeSystem')"
    outlined
    clearable
    :hide-details="hideDetails"
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'GradeSystemInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: String,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      rankingItems: [
        { text: this.$t('models.grade.none'), value: null },
        { text: this.$t('models.grade.french'), value: 'french' },
        { text: this.$t('models.grade.usa_lead'), value: 'usa_lead' },
        { text: this.$t('models.grade.usa_bouldering'), value: 'usa_bouldering' },
        { text: this.$t('models.grade.pick_district'), value: 'pick_district' }
      ],
      gradeSystem: this.value
    }
  },

  watch: {
    value () {
      this.gradeSystem = this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.gradeSystem)
    },

    onFocus () {
      this.$refs.gradeSystemInput.isMenuActive = true
    }
  }
}
</script>
