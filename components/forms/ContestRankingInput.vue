<template>
  <v-select
    v-model="category"
    :items="categories"
    item-text="text"
    item-value="value"
    :label="$t('components.input.contestRankingTypes')"
    outlined
    :class="required ? 'required-field' : ''"
    @change="onChange()"
  />
</template>
<script>
export default {
  name: 'ContestRankingInput',
  props: {
    value: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      categories: [
        { text: this.$t('models.contestRankingType.division'), value: 'division' },
        { text: this.$t('models.contestRankingType.division_and_zone'), value: 'division_and_zone' },
        { text: this.$t('models.contestRankingType.division_and_attempt'), value: 'division_and_attempt' },
        { text: this.$t('models.contestRankingType.attempts_to_top'), value: 'attempts_to_top' },
        { text: this.$t('models.contestRankingType.zone_and_top_realised'), value: 'zone_and_top_realised' },
        { text: this.$t('models.contestRankingType.attempts_to_one_zone_and_top'), value: 'attempts_to_one_zone_and_top' },
        // { text: this.$t('models.contestRankingType.attempts_to_two_zones_and_top'), value: 'attempts_to_two_zones_and_top' },
        { text: this.$t('models.contestRankingType.highest_hold'), value: 'highest_hold' },
        { text: this.$t('models.contestRankingType.fixed_points'), value: 'fixed_points' }
      ],
      category: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.category)
    }
  }
}
</script>
