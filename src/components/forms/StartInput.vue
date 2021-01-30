<template>
  <v-select
    v-model="start"
    :items="starts"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-arrow-expand-up"
    :label="$t('components.input.startType')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'StartInput',
  props: {
    value: String
  },

  data () {
    return {
      starts: [
        { text: this.$t('models.startType.sit'), value: 'sit' },
        { text: this.$t('models.startType.down'), value: 'down' },
        { text: this.$t('models.startType.stand'), value: 'stand' },
        { text: this.$t('models.startType.jump'), value: 'jump' },
        { text: this.$t('models.startType.run_and_jump'), value: 'run_and_jump' }
      ],
      start: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.start)
    }
  }
}
</script>
