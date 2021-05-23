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

      <loading-more
        :get-function="getVideos"
        :no-more-data="noMoreDataToLoad"
        :loading-more="loadingMoreData"
      />

      <p
        v-if="videos.length === 0 && !loadingVideos"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.video.noVideo') }}
      </p>
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import Video from '@/models/Video'
import Spinner from '@/components/layouts/Spiner'
import VideoCard from '@/components/videos/VideoCard'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  name: 'CurrentUserVideoView',
  mixins: [LoadingMoreHelpers],
  components: { LoadingMore, VideoCard, Spinner },
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.videos')
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
      this.moreIsBeingLoaded()
      CurrentUserApi
        .videos(this.page)
        .then(resp => {
          for (const video of resp.data) {
            this.videos.push(new Video(video))
          }
          this.successLoadingMore(resp)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'video')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingVideos = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
