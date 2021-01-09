<template>
  <v-select
    v-model="rain"
    :items="rains"
    item-text="text"
    item-value="value"
    :label="$t('components.input.rain')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'RainInput',
  props: {
    value: String
  },

  data () {
    return {
      rains: [
        { text: this.$t('models.rains.protected'), value: 'protected' },
        { text: this.$t('models.rains.exposed'), value: 'exposed' }
      ],
      rain: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.rain)
    }
  }
}
</script>
