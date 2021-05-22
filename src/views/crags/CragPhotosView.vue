<template>
  <v-container>

    <v-btn
      :to="`/photos/Crag/${crag.id}/new?redirect_to=${this.$route.fullPath}`"
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
      environnement-type="crag"
      :environnement-object="crag"
      gallery-type="Crag"
      :gallery-id="crag.id"
    />

    <spinner v-if="loadingVideos" :full-height="false"/>
    <div v-if="!loadingVideos">
      <v-btn
        :to="`/videos/Crag/${crag.id}/new?redirect_to=${this.$route.fullPath}`"
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
  components: {
    VideoCard,
    PhotoGallery,
    Spinner
  },
  mixins: [SessionConcern],
  props: {
    crag: Object
  },

  data () {
    return {
      loadingVideos: true,
      videos: [],
      cragPhotoMetaTitle: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.title', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region
      })}`,
      cragPhotoMetaDescription: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.description', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region,
        city: (this.crag || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.cragPhotoMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragPhotoMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.cragPhotoMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragPhotoMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path('photos')}`
        }
      ]
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos: function () {
      this.loadingVideos = true
      CragApi
        .videos(this.crag.id)
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
