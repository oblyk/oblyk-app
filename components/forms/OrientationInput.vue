<template>
  <v-select
    ref="orientationInput"
    v-model="orientations"
    :items="orientationsList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.orientations')"
    multiple
    outlined
    @change="onChange"
    @focus="onFocus"
  />
</template>
<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'OrientationInput',
  mixins: [InputHelpers],
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
    onChange () {
      this.$emit('input', this.orientations)
    },

    onFocus () {
      this.$refs.orientationInput.isMenuActive = true
    }
  }
}
</script>
