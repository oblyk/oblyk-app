<template>
  <v-select
    v-model="genre"
    :items="genres"
    item-text="text"
    item-value="value"
    :label="$t('components.input.genre')"
    outlined
    ref="genreInput"
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
    onChange: function () {
      this.$emit('input', this.genre)
    },

    onFocus: function () {
      this.$refs.genreInput.isMenuActive = true
    }
  }
}
</script>
