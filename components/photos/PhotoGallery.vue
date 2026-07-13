<template>
  <div>
    <div v-if="loadingGallery">
      <v-row no-gutters>
        <v-col
          cols="4"
          md="3"
          lg="2"
        >
          <v-skeleton-loader
            type="image"
            tile
            style="aspect-ratio: 1"
            width="100%"
          />
        </v-col>
      </v-row>
    </div>
    <v-row
      v-if="!loadingGallery"
      no-gutters
    >
      <v-col
        v-for="(photo, index) in photos"
        :key="`photo-${index}`"
        cols="4"
        md="3"
        lg="2"
        style="padding: 1px"
        :class="lgCol"
      >
        <photo-thumbnail
          :environnement-type="environnementType"
          :environnement-object="environnementObject"
          :photo-index="index"
          :photo="photo"
          :photos-gallery="photosGallery"
          :open-light-box-dialog="openLightBoxDialog"
        />
      </v-col>
      <v-col
        v-if="!loadingGallery"
        cols="4"
        md="3"
        lg="2"
      >
        <loading-more
          :get-function="getPhotos"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          skeleton-type="photos"
        />
      </v-col>
    </v-row>

    <!-- No photos -->
    <p
      v-if="!loadingGallery && photos.length === 0"
      class="text-center text--disabled my-5"
    >
      {{ $t('components.photo.noPhoto') }}
    </p>

    <!-- Full screen dialog for lightbox -->
    <client-only>
      <v-dialog
        v-model="lightBoxDialog"
        dark
        fullscreen
      >
        <v-card class="rounded-0">
          <light-box
            v-if="selectedPhoto"
            :photo="selectedPhoto"
            :photos-gallery="photos"
            :close-light-box-dialogue="closeLightBoxDialogue"
            :selected-index="selectedIndex"
          />
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import PhotoThumbnail from '@/components/photos/PhotoThumbnail'
import Photo from '@/models/Photo'
import LoadingMore from '@/components/layouts/LoadingMore'
import OblykApi from '~/services/oblyk-api/OblykApi'
const LightBox = () => import('@/components/photos/LightBox')

export default {
  name: 'PhotoGallery',
  components: {
    LoadingMore,
    LightBox,
    PhotoThumbnail
  },
  mixins: [LoadingMoreHelpers],
  props: {
    lgCol: {
      type: String,
      required: false,
      default: 'col-lg-2'
    },
    preloadPhotos: {
      type: Array,
      default: null
    },
    environnementType: {
      type: String,
      default: null
    },
    environnementObject: {
      type: Object,
      default: null
    },
    galleryType: {
      type: String,
      default: null
    },
    galleryId: {
      type: [Number, String],
      default: null
    }
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

  computed: {
    photosGallery () {
      return this.photos.map((photo) => { return photo.id })
    }
  },

  watch: {
    galleryId () {
      this.photos = []
      this.getPhotos()
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
    getPhotos () {
      const urls = {
        User: `/users/${this.galleryId}/photos`,
        Area: `/public/areas/${this.galleryId}/photos`,
        CragSector: `/public/crag_sectors/${this.galleryId}/photos`,
        CragRoute: `/public/crag_routes/${this.galleryId}/photos`,
        Crag: `/public/crags/${this.galleryId}/photos`,
        GuideBookPaper: `/public/guide_book_papers/${this.galleryId}/photos`,
        CurrentUser: '/current_users/photos'
      }

      this.moreIsBeingLoaded()
      new OblykApi(this.$axios, this.$auth)
        .get(urls[this.galleryType], { page: this.page })
        .then((resp) => {
          for (const photo of resp.data) {
            this.photos.push(new Photo({ attributes: photo }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingGallery = false
          this.finallyMoreIsLoaded()
        })
    },

    openLightBoxDialog (photoIndex) {
      this.lightBoxDialog = true
      setTimeout(() => {
        this.selectedPhoto = this.photos[photoIndex]
        this.selectedIndex = photoIndex
      }, 500)
    },

    closeLightBoxDialogue () {
      this.lightBoxDialog = false
    },

    changeSelectedIndex (photoIndex) {
      this.selectedPhoto = this.photos[photoIndex]
      this.selectedIndex = photoIndex
    }
  }
}
</script>
