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
import Video from '@/models/Video'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import VideoCard from '@/components/videos/VideoCard'
import LoadingMore from '@/components/layouts/LoadingMore'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'

export default {
  components: { LoadingMore, VideoCard, Spinner },
  mixins: [LoadingMoreHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingVideos: true,
      videos: []
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('meta.user.video.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription () {
      return this.$t('meta.user.video.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path}/videos`
      }
      return ''
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos () {
      this.moreIsBeingLoaded()
      new UserApi(this.$axios, this.$auth)
        .videos(this.user.uuid, this.page)
        .then((resp) => {
          for (const video of resp.data) {
            this.videos.push(new Video(video))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
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
