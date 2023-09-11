<template>
  <v-select
    v-model="obligation"
    :items="obligations"
    item-text="text"
    item-value="value"
    :label="$t('components.input.contestCategoryObligation')"
    outlined
    clearable
    :hide-details="hideDetails"
    :class="required ? 'required-field' : ''"
    @change="onChange()"
  />
</template>

<script>
export default {
  name: 'ContestCategoryObligationInput',
  props: {
    value: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      obligations: [
        { text: this.$t('models.contestCategoryObligationType.no'), value: null },
        { text: this.$t('models.contestCategoryObligationType.u10'), value: 'u10' },
        { text: this.$t('models.contestCategoryObligationType.u12'), value: 'u12' },
        { text: this.$t('models.contestCategoryObligationType.u14'), value: 'u14' },
        { text: this.$t('models.contestCategoryObligationType.u16'), value: 'u16' },
        { text: this.$t('models.contestCategoryObligationType.u18'), value: 'u18' },
        { text: this.$t('models.contestCategoryObligationType.u20'), value: 'u20' },
        { text: this.$t('models.contestCategoryObligationType.senior'), value: 'senior' },
        { text: this.$t('models.contestCategoryObligationType.veteran_1'), value: 'veteran_1' },
        { text: this.$t('models.contestCategoryObligationType.veteran_2'), value: 'veteran_2' },
        { text: this.$t('models.contestCategoryObligationType.between_age'), value: 'between_age' }
      ],
      obligation: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.obligation)
    }
  }
}
</script>
