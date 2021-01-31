<template>
  <v-row class="full-height" v-if="photo">

    <!-- Close viewer -->
    <close-form
      class="close-lightbox-photo"
      :back-to-url="redirectTo"
    />

    <!-- Previous picture -->
    <light-box-arrow
      class="light-box-arrow previous-arrow"
      direction="previous"
      :photo="photo"
      :back-to-url="redirectTo"
      :photos-gallery="photosGallery"
    />

    <!-- Photo info -->
    <photo-card-info class="photo-information" :photo="photo" />

    <!-- Picture viewer -->
    <v-col class="full-height pb-0 pt-0">
      <photo-viewer :photo="photo" />
    </v-col>

    <!-- Next picture -->
    <light-box-arrow
      class="light-box-arrow next-arrow"
      direction="next"
      :photo="photo"
      :back-to-url="redirectTo"
      :photos-gallery="photosGallery"
    />
  </v-row>
</template>

<script>
import { PhotoConcern } from '@/concerns/PhotoConcern'
import PhotoViewer from '@/components/photos/PhotoViewer'
import PhotoCardInfo from '@/components/photos/PhotoCardInfo'
import CloseForm from '@/components/forms/CloseForm'
import LightBoxArrow from '@/components/photos/LightBoxArrow'

export default {
  name: 'LightBoxView',
  components: { LightBoxArrow, CloseForm, PhotoCardInfo, PhotoViewer },
  mixins: [PhotoConcern],

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.photosGallery = urlParams.get('photos').split('-')
    this.redirectTo = urlParams.get('redirect_to')
  },

  data () {
    return {
      photosGallery: [],
      redirectTo: null
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-information {
  left: 10px;
  top: 10px;
  z-index: 10;
  max-width: 100%;
  position: absolute;
}
.close-lightbox-photo {
  z-index: 10;
}
.light-box-arrow {
  position: absolute;
  z-index: 10;
  top: 50vh;
  &.previous-arrow {
    left: 5px;
  }
  &.next-arrow {
    right: 5px;
  }
}
</style>
