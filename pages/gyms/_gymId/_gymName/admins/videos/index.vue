<template>
  <v-container>
    <spinner v-if="loadingVideos && !gym" />
    <div v-if="!loadingVideos && gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <div
        style="max-width: 550px"
        class="mx-auto"
      >
        <v-switch
          v-model="iMSubscribe"
          :loading="loadingUpdateSubscribe"
          :label="$t('models.gymAdministrator.subscribe_to_video_feed')"
          @change="switchSubscribe"
        />
        <v-sheet
          v-for="(video, videoIndex) in videos"
          :key="`video-index-${videoIndex}`"
          class="rounded pa-2 mb-4"
        >
          <gym-route-list-item
            :gym-route="gymRouteToObject(video.viewable)"
            :click-callback="getGymRoute"
            class="mb-1 border pl-1"
          />
          <video-card
            v-once
            :video="video"
            :last-read="lastReadAt()"
            moderable
          />
          <div class="d-flex">
            <v-btn
              text
              outlined
              small
              color="red"
              class="ml-auto"
              @click="deleteVideo(video)"
            >
              {{ $t('actions.delete') }}
            </v-btn>
          </div>
        </v-sheet>
        <v-sheet
          v-if="videos.length === 0"
          class="pa-5 rounded text-center"
        >
          <p>
            {{ $t('components.gymAdmin.noVideos') }}
          </p>
          <v-icon
            large
            color="deep-purple accent-4"
          >
            {{ mdiMovieOpen }}
          </v-icon>
        </v-sheet>
        <loading-more
          :get-function="getVideos"
          :no-more-data="noMoreDataToLoad"
          :loading-more="loadingMoreData"
        />
      </div>

      <!-- Popup for gym route -->
      <down-to-close-dialog
        ref="GymRouteDialog"
        v-model="gymRouteDialog"
        padding-x="px-2"
        :close-callback="closeGymRouteModal"
        wait-signal
      >
        <gym-route-info
          v-if="!loadingGymRoute && gymRoute"
          :close-callback="closeGymRouteModal"
          :gym-route="gymRoute"
          :gym="gym"
        />
      </down-to-close-dialog>
    </div>
  </v-container>
</template>

<script>
import { mdiMovieOpen } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRoute from '~/models/GymRoute'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'
import Video from '~/models/Video'
import Spinner from '~/components/layouts/Spiner'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import LoadingMore from '~/components/layouts/LoadingMore'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo'
import VideoCard from '~/components/videos/VideoCard'
import VideoApi from '~/services/oblyk-api/VideoApi'

export default {
  components: {
    VideoCard,
    GymRouteInfo,
    DownToCloseDialog,
    LoadingMore,
    GymRouteListItem,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymRolesHelpers, LoadingMoreHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingVideos: true,
      videos: [],
      gymRouteDialog: false,
      loadingGymRoute: true,
      gymRoute: null,
      iMSubscribe: false,
      loadingUpdateSubscribe: false,

      mdiMovieOpen
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les vidéos'
      },
      en: {
        metaTitle: 'Videos'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.videos'),
          to: `${this.gym?.adminPath}/videos`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getVideos()
    this.updateLastReadVideo()
    this.iMSubscribe = this.subscribeToVideoFeed(this.$route.params.gymId)
  },

  methods: {
    getVideos () {
      this.moreIsBeingLoaded()
      new GymApi(this.$axios, this.$auth)
        .videos(this.$route.params.gymId, this.page)
        .then((resp) => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video({ attributes: video }))
          }
          this.successLoadingMore(resp)
        })
        .finally(() => {
          this.loadingVideos = false
          this.finallyMoreIsLoaded()
        })
    },

    gymRouteToObject (route) {
      return new GymRoute({ attributes: route })
    },

    closeGymRouteModal () {
      this.gymRouteDialog = false
    },

    getGymRoute (route) {
      this.loadingGymRoute = true
      this.gymRouteDialog = true
      new GymRouteApi(this.$axios, this.$auth)
        .find(this.gym.id, route.gym_space.id, route.id)
        .then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
          this.$refs.GymRouteDialog?.signal()
        })
        .finally(() => {
          this.loadingGymRoute = false
        })
    },

    updateLastReadVideo () {
      setTimeout(() => {
        new GymAdministratorApi(this.$axios, this.$auth)
          .updateFeedLastRead(this.$route.params.gymId, 'video')
          .then(() => {
            this.$auth.fetchUser()
          })
      }, 2000)
    },

    lastReadAt () {
      const gymId = parseInt(this.$route.params.gymId)
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === gymId)
      return administeredGym.last_video_feed_read_at
    },

    switchSubscribe () {
      const gymId = parseInt(this.$route.params.gymId)
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === gymId)
      this.loadingUpdateSubscribe = true
      new GymAdministratorApi(this.$axios, this.$auth)
        .update({
          gym_id: gymId,
          id: administeredGym.id,
          subscribe_to_video_feed: this.iMSubscribe
        })
        .then(() => {
          this.$auth.fetchUser()
        })
        .finally(() => {
          this.loadingUpdateSubscribe = false
        })
    },

    deleteVideo (video) {
      this.loadingVideos = true
      if (confirm(this.$t('common.areYouSurDeleteVideo'))) {
        new VideoApi(this.$axios, this.$auth)
          .moderateByGymAdministrator(video.id)
          .then(() => {
            this.page = 1
            this.getVideos()
          })
      }
    }
  }
}
</script>
