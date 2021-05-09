<template>
  <v-container>
    <spinner v-if="loadingPhotos" :full-height="false"/>

    <div v-if="!loadingPhotos">
      <v-btn
        :to="`/photos/CragSector/${cragSector.id}/new?redirect_to=${this.$route.fullPath}`"
        text
        color="primary"
        v-if="isLoggedIn"
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <photo-gallery
        environnement-type="cragSector"
        :environnement-object="cragSector"
        :photos="photos"
        lg-col="col-lg-3"
      />
    </div>

    <spinner v-if="loadingVideos" :full-height="false" />
    <div v-if="!loadingVideos">
      <v-row>
        <v-col
          v-for="video in videos"
          :key="`video-${video.id}`"
          class="col-12 col-md-6 col-lg-3"
        >
          <video-card
            :video="video"
            :get-videos="getVideos"
          />
        </v-col>
      </v-row>
      <p
        v-if="videos.length === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.video.noVideo') }}
      </p>
    </div>
  </v-container>
</template>

<script>
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import Video from '@/models/Video'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import VideoCard from '@/components/videos/VideoCard'
import { SessionConcern } from '@/concerns/SessionConcern'
import Photo from '@/models/Photo'

export default {
  name: 'CragSectorPhotosView',
  components: { VideoCard, PhotoGallery, Spinner },
  mixins: [SessionConcern],
  props: {
    cragSector: Object
  },

  data () {
    return {
      loadingPhotos: true,
      loadingVideos: true,
      photos: [],
      videos: []
    }
  },

  computed: {
    cragSectorMetaTitle: function () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.pictures')}
        ${this.$t('meta.cragSector.title', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })}
        `
      }
      return ''
    },
    cragSectorMetaDescription: function () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.pictures')}
        ${this.$t('meta.cragSector.description', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })}
        `
      }
      return ''
    },
    cragSectorMetaUrl: function () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path('photos')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  mounted () {
    this.getPhotos()
    this.getVideos()
  },

  methods: {
    getPhotos: function () {
      this.loadingPhotos = true
      this.photos = []
      CragSectorApi
        .photos(this.cragSector.id)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'photo')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    },

    getVideos: function () {
      this.loadingVideos = true
      CragSectorApi
        .videos(this.cragSector.id)
        .then(resp => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video(video))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'video')
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
