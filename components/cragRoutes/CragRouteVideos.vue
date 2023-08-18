<template>
  <div>
    <p>
      <v-icon left>
        {{ mdiVideo }}
      </v-icon>
      {{ $t('components.video.title') }}
    </p>

    <spinner v-if="loadingVideos" :full-height="false" />
    <div v-if="!loadingVideos">
      <v-row>
        <v-col
          v-for="video in videos"
          :key="`video-${video.id}`"
          class="col-12 col-md-6"
          :class="lgCol"
        >
          <video-card
            :video="video"
            :get-videos="getVideos"
          />
        </v-col>
      </v-row>
      <p
        v-if="videos.length === 0"
        class="text--disabled my-5 text-center"
      >
        {{ $t('components.video.noVideo') }}
      </p>
      <client-only>
        <p class="text-right">
          <v-btn
            v-if="$auth.loggedIn"
            :to="`/videos/CragRoute/${cragRoute.id}/new?redirect_to=${$route.fullPath}`"
            text
            outlined
            color="primary"
          >
            <v-icon small left>
              {{ mdiVideoPlus }}
            </v-icon>
            {{ $t('actions.addVideo') }}
          </v-btn>
        </p>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mdiVideo, mdiVideoPlus } from '@mdi/js'
import Spinner from '@/components/layouts/Spiner'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import VideoCard from '@/components/videos/VideoCard'
import Video from '@/models/Video'

export default {
  name: 'CragRouteVideos',
  components: { VideoCard, Spinner },
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    lgCol: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      loadingVideos: true,
      videos: [],

      mdiVideo,
      mdiVideoPlus
    }
  },

  watch: {
    cragRoute () {
      this.getVideos()
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos () {
      this.loadingVideos = true
      new CragRouteApi(this.$axios, this.$auth)
        .videos(this.cragRoute.id)
        .then((resp) => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video({ attributes: video }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
