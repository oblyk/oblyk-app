<template>
  <v-container>

    <spinner v-if="loadingPhotos" :full-height="false"/>
    <div v-if="!loadingPhotos">
      <v-btn
        :to="`/photos/Crag/${cragId}/new?redirect_to=${this.$route.fullPath}`"
        text
        color="primary"
        v-if="isLoggedIn"
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <photo-gallery :photos-data="photos" />
    </div>

    <spinner v-if="loadingVideos" :full-height="false" />
    <div v-if="!loadingVideos">
      <v-btn
        :to="`/videos/Crag/${cragId}/new?redirect_to=${this.$route.fullPath}`"
        text
        color="primary"
        v-if="isLoggedIn"
      >
        <v-icon left>
          mdi-video-plus
        </v-icon>
        {{ $t('actions.addVideo') }}
      </v-btn>
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
import CragApi from '@/services/oblyk-api/CragApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import { SessionConcern } from '@/concerns/SessionConcern'
import VideoCard from '@/components/videos/VideoCard'
import Video from '@/models/Video'

export default {
  name: 'CragPhotosView',
  components: { VideoCard, PhotoGallery, Spinner },
  mixins: [SessionConcern],

  data () {
    return {
      loadingPhotos: true,
      loadingVideos: true,
      photos: [],
      videos: [],
      cragId: this.$route.params.cragId
    }
  },

  mounted () {
    this.getPhotos()
    this.getVideos()
  },

  methods: {
    getPhotos: function () {
      this.loadingPhotos = true
      CragApi
        .photos(this.cragId)
        .then(resp => {
          this.photos = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    },

    getVideos: function () {
      this.loadingVideos = true
      CragApi
        .videos(this.cragId)
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
