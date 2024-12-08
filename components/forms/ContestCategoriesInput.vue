<template>
  <v-select
    v-model="category"
    :items="categories"
    item-text="text"
    item-value="value"
    :label="$t('components.input.contestCategoryTypes')"
    outlined
    :class="required ? 'required-field' : ''"
    @change="onChange()"
  />
</template>

<script>
export default {
  name: 'ContestCategoriesInput',
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
        { text: this.$t('models.contestCategoryType.official_under_age'), value: 'official_under_age' },
        { text: this.$t('models.contestCategoryType.custom'), value: 'custom' }
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
