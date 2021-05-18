<template>
  <div>
    <spinner v-if="loadingGallery" />
    <v-row
      v-if="!loadingGallery"
      no-gutters
    >
      <v-col
        v-for="(photo, index) in photos"
        :key="`photo-${index}`"
        class="col-6 col-md-4 d-flex child-flex pa-1"
        v-bind:class="lgCol"
      >
        <photo-thumbnail
          :environnement-type="environnementType"
          :environnement-object="environnementObject"
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

    <loading-more
      :get-function="getPhotos"
      v-if="!loadingGallery"
    />

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
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import Photo from '@/models/Photo'
import LoadingMore from '@/components/layouts/LoadingMore'
import AreaApi from '@/services/oblyk-api/AreaApi'

export default {
  name: 'PhotoGallery',
  components: {
    LoadingMore,
    Spinner,
    LightBox,
    PhotoThumbnail
  },
  props: {
    lgCol: {
      type: String,
      required: false,
      default: 'col-lg-2'
    },
    environnementType: String,
    environnementObject: Object,
    galleryType: String,
    galleryId: [Number, String]
  },

  data () {
    return {
      photos: [],
      loadingGallery: true,
      lightBoxDialog: false,
      selectedPhoto: null,
      selectedIndex: null
    }
  },

  mounted () {
    this.getPhotos()
    this.$root.$on('LightBoxChangeSelectedIndex', (photoIndex) => {
      this.changeSelectedIndex(photoIndex)
    })
  },

  beforeDestroy () {
    this.$root.$off('LightBoxChangeSelectedIndex')
  },

  methods: {
    getPhotos: function (page = 1) {
      let promise

      if (this.galleryType === 'User') {
        promise = UserApi
      } else if (this.galleryType === 'Area') {
        promise = AreaApi
      }

      promise
        .photos(this.galleryId, page)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
          if (resp.data.length < 25) this.$root.$emit('nothingMoreToLoad')
        })
        .catch(() => {
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingGallery = false
          this.$root.$emit('moreIsLoaded')
        })
    },

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
