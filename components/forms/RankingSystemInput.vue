<template>
  <v-select
    ref="rankingSystemInput"
    v-model="rankingSystem"
    v-disabled-icon-focus
    :items="rankingItems"
    item-text="text"
    item-value="value"
    :label="$t('components.input.rankingSystem')"
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
  name: 'RankingSystemInput',
  mixins: [InputHelpers],
  props: {
    value: { type: String, default: null },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      rankingItems: [
        { text: this.$t('models.rankingSystem.division'), value: 'division' },
        { text: this.$t('models.rankingSystem.point_by_grade'), value: 'point_by_grade' },
        { text: this.$t('models.rankingSystem.fixed_points'), value: 'fixed_points' }
      ],
      rankingSystem: this.value
    }
  },

  watch: {
    value () {
      this.rankingSystem = this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.rankingSystem)
    },

    onFocus () {
      this.$refs.rankingSystemInput.isMenuActive = true
    }
  }
}
</script>
