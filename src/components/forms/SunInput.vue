<template>
  <v-select
    v-model="sun"
    :items="suns"
    item-text="text"
    item-value="value"
    :label="$t('components.input.sun')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'SunInput',
  props: {
    value: String
  },

  data () {
    return {
      suns: [
        { text: this.$t('models.suns.sunny_all_day'), value: 'sunny_all_day' },
        { text: this.$t('models.suns.shady'), value: 'shady' },
        { text: this.$t('models.suns.sunny_afternoon'), value: 'sunny_afternoon' },
        { text: this.$t('models.suns.sunny_morning'), value: 'sunny_morning' }
      ],
      sun: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.sun)
    }
  }
}
</script>
