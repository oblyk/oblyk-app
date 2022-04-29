<template>
  <v-container>
    <client-only>
      <v-btn
        v-if="isLoggedIn"
        :to="`/a/photos/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
        text
        color="primary"
      >
        <v-icon left>
          {{ mdiImagePlus }}
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
    </client-only>

    <photo-gallery
      environnement-type="crag"
      :environnement-object="crag"
      gallery-type="Crag"
      :gallery-id="crag.id"
    />

    <client-only>
      <!-- Load videos -->
      <spinner v-if="loadingVideos" :full-height="false" />

      <div v-if="!loadingVideos">
        <v-btn
          v-if="isLoggedIn"
          :to="`/a/videos/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
          text
          color="primary"
        >
          <v-icon left>
            {{ mdiVideoPlus }}
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
    </client-only>
  </v-container>
</template>

<script>
import { mdiImagePlus, mdiVideoPlus } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragApi from '@/services/oblyk-api/CragApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
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
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiImagePlus,
      mdiVideoPlus,
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

  head () {
    return {
      titleTemplate: this.cragPhotoMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragPhotoMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragPhotoMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragPhotoMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/photos`
        }
      ]
    }
  },

  mounted () {
    this.getVideos()
    this.$store.commit('layout/LAYOUT_PADDING', false)
  },

  methods: {
    getVideos () {
      this.loadingVideos = true
      new CragApi(this.$axios, this.$auth)
        .videos(this.crag.id)
        .then((resp) => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video(video))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'video')
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
