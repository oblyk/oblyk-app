<template>
  <v-select
    v-model="seasons"
    :items="seasonsList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.seasons')"
    multiple
    outlined
    @change="onChange()"
  />
</template>
<script>
export default {
  name: 'SeasonInput',
  props: {
    value: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      seasonsList: [
        { text: this.$t('models.seasons.summer'), value: 'summer' },
        { text: this.$t('models.seasons.autumn'), value: 'autumn' },
        { text: this.$t('models.seasons.winter'), value: 'winter' },
        { text: this.$t('models.seasons.spring'), value: 'spring' }
      ],
      seasons: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.seasons)
    }
  }
}
</script>
