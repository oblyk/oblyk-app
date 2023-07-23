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
      <v-col
        v-if="photos.length === 0"
      >
        <p class="text-center text--disabled mt-5 mb-5">
          {{ $t('components.photo.noPhoto') }}
        </p>
      </v-col>
    </v-row>

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
import UserApi from '~/services/oblyk-api/UserApi'
import Photo from '@/models/Photo'
import LoadingMore from '@/components/layouts/LoadingMore'
import AreaApi from '~/services/oblyk-api/AreaApi'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragApi from '~/services/oblyk-api/CragApi'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
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
      let promise

      if (this.galleryType === 'User') {
        promise = new UserApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'Area') {
        promise = new AreaApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'CragSector') {
        promise = new CragSectorApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'CragRoute') {
        promise = new CragRouteApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'Crag') {
        promise = new CragApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'GuideBookPaper') {
        promise = new GuideBookPaperApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'CurrentUser') {
        promise = new CurrentUserApi(this.$axios, this.$auth)
      } else if (this.galleryType === 'Feed') {
        for (const photo of this.preloadPhotos) {
          this.photos.push(new Photo({ attributes: photo }))
        }
        this.loadingGallery = false
        this.noMoreDataToLoad = true
        return
      }

      this.moreIsBeingLoaded()
      promise
        .photos(this.galleryId, this.page)
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
