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
              v-if="$auth.loggedIn"
              elevation="0"
              color="primary"
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
              <indoor-subscription-lock-alert
                v-if="currentUserIsGymAdmin() && gym.plan === 'free'"
                feature="video"
                :gym="gym"
              />
              <video-form
                :video="{ viewable_type: 'GymRoute', viewable_id: gymRoute.id }"
                :show-description="currentUserIsGymAdmin()"
                :enable-oblyk-video="currentUserIsGymAdmin() && gym.plan !== 'free'"
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
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  name: 'GymRouteVideoList',
  components: { IndoorSubscriptionLockAlert, VideoForm, VideoCard },
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
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
