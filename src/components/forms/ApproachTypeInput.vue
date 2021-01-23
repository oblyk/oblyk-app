<template>
  <v-select
    v-model="approachType"
    :items="approachTypes"
    item-text="text"
    item-value="value"
    :label="$t('components.input.approachType')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'ApproachTypeInput',
  props: {
    value: String
  },

  data () {
    return {
      approachTypes: [
        { text: this.$t('models.approachType.steep_descent'), value: 'steep_descent' },
        { text: this.$t('models.approachType.soft_descent'), value: 'soft_descent' },
        { text: this.$t('models.approachType.flat'), value: 'flat' },
        { text: this.$t('models.approachType.soft_ascent'), value: 'soft_ascent' },
        { text: this.$t('models.approachType.steep_ascent'), value: 'steep_ascent' },
        { text: this.$t('models.approachType.various'), value: 'various' }
      ],
      approachType: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.approachType)
    }
  }
}
</script>
