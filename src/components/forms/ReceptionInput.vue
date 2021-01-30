<template>
  <v-select
    v-model="reception"
    :items="receptions"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-selection-ellipse-arrow-inside"
    :label="$t('components.input.receptionType')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'ReceptionInput',
  props: {
    value: String
  },

  data () {
    return {
      receptions: [
        { text: this.$t('models.receptionType.good'), value: 'good' },
        { text: this.$t('models.receptionType.correct'), value: 'correct' },
        { text: this.$t('models.receptionType.bad'), value: 'bad' },
        { text: this.$t('models.receptionType.dangerous'), value: 'dangerous' }
      ],
      reception: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.reception)
    }
  }
}
</script>
