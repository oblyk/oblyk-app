<template>
  <div>
    <p>
      <v-icon left>
        mdi-video
      </v-icon>
      {{ $t('components.video.title') }}
    </p>

    <spinner v-if="loadingVideos" :full-height="false"/>
    <div v-if="!loadingVideos">
      <v-row>
        <v-col
          v-for="video in videos"
          :key="`video-${video.id}`"
          class="col-12 col-md-6"
          v-bind:class="lgCol"
        >
          <video-card
            :video="video"
            :get-videos="getVideos"
          />
        </v-col>
      </v-row>
      <p class="text-right">
        <v-btn
          :to="`/videos/CragRoute/${cragRoute.id}/new?redirect_to=${this.$route.fullPath}`"
          text
          small
          color="primary"
          v-if="isLoggedIn"
        >
          <v-icon small left>
            mdi-video-plus
          </v-icon>
          {{ $t('actions.addVideo') }}
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
import VideoCard from '@/components/videos/VideoCard'
import Video from '@/models/Video'

export default {
  name: 'CragRouteVideos',
  components: { VideoCard, Spinner },
  mixins: [SessionConcern],
  props: {
    cragRoute: Object,
    lgCol: String
  },

  data () {
    return {
      loadingVideos: true,
      videos: []
    }
  },

  watch: {
    cragRoute: function () {
      this.getVideos()
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos: function () {
      this.loadingVideos = true
      CragRouteApi
        .videos(this.cragRoute.id)
        .then(resp => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video(video))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
