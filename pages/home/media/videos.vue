<template>
  <div>
    <spinner v-if="loadingVideos" :full-height="false" />
    <div v-if="!loadingVideos">
      <v-row>
        <v-col
          v-for="video in videos"
          :key="`video-${video.id}`"
          class="col-12 col-md-6 col-lg-4"
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
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import Video from '~/models/Video'
import Spinner from '~/components/layouts/Spiner.vue'
import VideoCard from '~/components/videos/VideoCard.vue'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

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

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes vidéos'
      },
      en: {
        metaTitle: 'My videos'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos () {
      this.moreIsBeingLoaded()
      new CurrentUserApi(this.$axios, this.$auth)
        .videos(this.page)
        .then((resp) => {
          for (const video of resp.data) {
            this.videos.push(new Video({ attributes: video }))
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
