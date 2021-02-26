<template>
  <div>
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
  </div>
</template>

<script>
import Video from '@/models/Video'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import VideoCard from '@/components/videos/VideoCard'

export default {
  name: 'UserVideoView',
  components: { VideoCard, Spinner },
  props: {
    user: Object
  },

  data () {
    return {
      loadingVideos: true,
      videos: []
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos: function () {
      this.loadingVideos = true
      UserApi
        .videos(this.user.uuid)
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
