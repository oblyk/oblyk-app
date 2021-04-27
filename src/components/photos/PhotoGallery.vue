<template>
  <div>
    <v-row
      no-gutters
    >
      <v-col
        v-for="(photo, index) in photos"
        :key="`photo-${index}`"
        class="col-6 col-md-4 d-flex child-flex pa-1"
        v-bind:class="lgCol"
      >
        <photo-thumbnail
          :photo-index="index"
          :photo="photo"
          :photos-gallery="photosGallery()"
          :open-light-box-dialog="openLightBoxDialog"
        />
      </v-col>
      <v-col
        v-if="photos.length === 0"
      >
        <p class="text-center text--disabled mt-5 mb-5">
          {{ $t('components.photo.noPhoto') }}
        </p>
      </v-col>
    </v-row>

    <!-- Full screen dialog for lightbox -->
    <v-dialog
      dark
      v-model="lightBoxDialog"
      fullscreen
    >
      <v-card class="rounded-0">
        <light-box
          v-if="selectedPhoto !== null"
          :photo="selectedPhoto"
          :photos-gallery="photos"
          :close-light-box-dialogue="closeLightBoxDialogue"
          :selected-index="selectedIndex"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PhotoThumbnail from '@/components/photos/PhotoThumbnail'
import LightBox from '@/components/photos/LightBox'

export default {
  name: 'PhotoGallery',
  components: { LightBox, PhotoThumbnail },
  props: {
    photos: Array,
    lgCol: {
      type: String,
      required: false,
      default: 'col-lg-2'
    }
  },

  data () {
    return {
      lightBoxDialog: false,
      selectedPhoto: null,
      selectedIndex: null
    }
  },

  mounted () {
    this.$root.$on('LightBoxChangeSelectedIndex', (photoIndex) => {
      this.changeSelectedIndex(photoIndex)
    })
  },

  beforeDestroy () {
    this.$root.$off('LightBoxChangeSelectedIndex')
  },

  methods: {
    openLightBoxDialog: function (photoIndex) {
      this.lightBoxDialog = true
      setTimeout(() => {
        this.selectedPhoto = this.photos[photoIndex]
        this.selectedIndex = photoIndex
      }, 500)
    },

    closeLightBoxDialogue: function () {
      this.lightBoxDialog = false
    },

    photosGallery: function () {
      return this.photos.map(photo => { return photo.id })
    },

    changeSelectedIndex: function (photoIndex) {
      this.selectedPhoto = this.photos[photoIndex]
      this.selectedIndex = photoIndex
    }
  }
}
</script>
