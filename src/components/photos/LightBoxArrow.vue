<template>
  <v-btn
    large
    v-if="(direction === 'next' && !isLastPhoto()) || (direction === 'previous' && !isFirstPhoto())"
    icon
    @click="changePhotoIndex()"
  >
    <v-icon>{{ arrowIcon() }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'LightBoxArrow',
  props: {
    direction: String,
    selectedIndex: Number,
    photosGallery: Array
  },

  methods: {
    changePhotoIndex: function () {
      if (this.direction === 'next') this.$root.$emit('LightBoxChangeSelectedIndex', this.selectedIndex + 1)
      if (this.direction === 'previous') this.$root.$emit('LightBoxChangeSelectedIndex', this.selectedIndex - 1)
    },

    isLastPhoto: function () {
      return this.selectedIndex === this.photosGallery.length - 1
    },

    isFirstPhoto: function () {
      return this.selectedIndex === 0
    },

    arrowIcon: function () {
      return this.direction === 'next' ? 'mdi-arrow-right' : 'mdi-arrow-left'
    }
  }
}
</script>
