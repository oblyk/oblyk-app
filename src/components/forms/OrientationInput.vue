<template>
  <v-select
    v-model="orientations"
    :items="orientationsList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.orientations')"
    multiple
    outlined
    @change="onChange()"
  ></v-select>
</template>
<script>
export default {
  name: 'OrientationInput',
  props: {
    value: Array
  },

  data () {
    return {
      orientationsList: [
        { text: this.$t('models.orientations.north'), value: 'north' },
        { text: this.$t('models.orientations.north_east'), value: 'north_east' },
        { text: this.$t('models.orientations.east'), value: 'east' },
        { text: this.$t('models.orientations.south_east'), value: 'south_east' },
        { text: this.$t('models.orientations.south'), value: 'south' },
        { text: this.$t('models.orientations.south_west'), value: 'south_west' },
        { text: this.$t('models.orientations.west'), value: 'west' },
        { text: this.$t('models.orientations.north_west'), value: 'north_west' }
      ],
      orientations: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.orientations)
    }
  }
}
</script>
