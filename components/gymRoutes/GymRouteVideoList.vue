<template>
  <div>
    <p
      v-if="loadingVideos"
      class="text-center my-5 text--disabled"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <v-sheet
        v-for="(video, videoIndex) in videos"
        :key="`video-index-${videoIndex}`"
        rounded
        class="pa-2 rounded-sm border mb-2"
      >
        <video-card
          :video="video"
          :get-videos="getVideos"
        />
      </v-sheet>
      <p
        v-if="videos.length === 0"
        class="text--disabled text-center my-4"
      >
        {{ $t('components.video.noVideo') }}
      </p>
      <div class="text-center">
        <v-dialog
          v-model="addDialogVideo"
          width="500"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              outlined
              text
              class="black-btn-icon mt-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiPlus }}
              </v-icon>
              {{ $t('actions.addVideo') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              {{ $t('actions.addVideo') }}
            </v-card-title>
            <div class="px-4 pb-4">
              <video-form
                :video="{ viewable_type: 'GymRoute', viewable_id: gymRoute.id }"
                :show-description="false"
                :callback="getVideos"
              />
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import VideoApi from '~/services/oblyk-api/VideoApi'
import Video from '~/models/Video'
import VideoCard from '~/components/videos/VideoCard.vue'
import VideoForm from '~/components/videos/forms/VideoForm.vue'

export default {
  name: 'GymRouteVideoList',
  components: { VideoForm, VideoCard },
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      videos: [],
      addDialogVideo: false,
      loadingVideos: true,

      mdiPlus
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos () {
      this.loadingVideos = true
      this.addDialogVideo = false
      new VideoApi(this.$axios, this.$auth)
        .all('GymRoute', this.gymRoute.id)
        .then((resp) => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video({ attributes: video }))
          }
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
