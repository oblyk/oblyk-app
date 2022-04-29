<template>
  <v-select
    ref="genreInput"
    v-model="genre"
    :items="genres"
    item-text="text"
    item-value="value"
    :label="$t('components.input.genre')"
    outlined
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'GenreInput',
  props: {
    value: String
  },

  data () {
    return {
      genres: [
        { text: this.$t('models.genres.undefined'), value: null },
        { text: this.$t('models.genres.male'), value: 'male' },
        { text: this.$t('models.genres.female'), value: 'female' }
      ],
      genre: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.genre)
    },

    onFocus () {
      this.$refs.genreInput.isMenuActive = true
    }
  }
}
</script>
