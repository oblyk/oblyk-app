<template>
  <v-select
    ref="genreInput"
    v-model="genre"
    :items="genres"
    item-text="text"
    item-value="value"
    :class="required ? 'required-field' : ''"
    :label="$t('components.input.genre')"
    outlined
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'GenreInput',
  props: {
    value: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    withUndefined: {
      type: Boolean,
      default: true
    },
    withUnisex: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      genre: this.value
    }
  },

  computed: {
    genres () {
      const genres = []
      if (this.withUndefined) {
        genres.push({ text: this.$t('models.genres.undefined'), value: null })
      }
      if (this.withUnisex) {
        genres.push({ text: this.$t('models.genres.unisex'), value: 'unisex' })
      }
      genres.push({ text: this.$t('models.genres.male'), value: 'male' })
      genres.push({ text: this.$t('models.genres.female'), value: 'female' })
      return genres
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
