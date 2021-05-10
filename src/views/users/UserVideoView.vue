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

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.video.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.video.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path('videos')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.userMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.userMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.userMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.userMetaDescription },
        { vmid: 'og-url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
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
