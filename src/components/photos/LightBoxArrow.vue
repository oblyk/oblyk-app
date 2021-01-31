<template>
  <v-btn
    large
    v-if="(direction === 'next' && !isLastPhoto()) || (direction === 'previous' && !isFirstPhoto())"
    icon
    :to="photoPath()"
  >
    <v-icon>{{ arrowIcon() }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'LightBoxArrow',
  props: {
    direction: String,
    photo: Object,
    photosGallery: Array,
    backToUrl: String
  },

  methods: {
    photoIndex: function () {
      let index = 0
      for (const photoId of this.photosGallery) {
        if (parseInt(photoId) === this.photo.id) return index
        index++
      }
      return index
    },

    isLastPhoto: function () {
      return this.photoIndex() === this.photosGallery.length - 1
    },

    isFirstPhoto: function () {
      return this.photoIndex() === 0
    },

    arrowIcon: function () {
      return this.direction === 'next' ? 'mdi-arrow-right' : 'mdi-arrow-left'
    },

    photoPath: function () {
      const nextIndex = (this.direction === 'next') ? this.photosGallery[this.photoIndex() + 1] : this.photosGallery[this.photoIndex() - 1]

      return `/photos/${nextIndex}?photos=${this.photosGallery.join('-')}&redirect_to=${this.backToUrl}`
    }
  }
}
</script>
