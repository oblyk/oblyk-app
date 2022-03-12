<template>
  <v-btn
    v-if="(direction === 'next' && !isLastPhoto) || (direction === 'previous' && !isFirstPhoto)"
    large
    icon
    @click="changePhotoIndex()"
  >
    <v-icon>{{ arrowIcon }}</v-icon>
  </v-btn>
</template>
<script>
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js'

export default {
  name: 'LightBoxArrow',
  props: {
    direction: String,
    selectedIndex: Number,
    photosGallery: Array
  },

  data () {
    return {
      mdiArrowRight,
      mdiArrowLeft
    }
  },

  computed: {
    isLastPhoto () {
      return this.selectedIndex === this.photosGallery.length - 1
    },

    isFirstPhoto () {
      return this.selectedIndex === 0
    },

    arrowIcon () {
      return this.direction === 'next' ? mdiArrowRight : mdiArrowLeft
    }
  },

  methods: {
    changePhotoIndex () {
      if (this.direction === 'next') { this.$root.$emit('LightBoxChangeSelectedIndex', this.selectedIndex + 1) }
      if (this.direction === 'previous') { this.$root.$emit('LightBoxChangeSelectedIndex', this.selectedIndex - 1) }
    }
  }
}
</script>
