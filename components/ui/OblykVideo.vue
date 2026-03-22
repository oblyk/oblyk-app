<template>
  <div
    class="oblyk-video"
    :class="rounded ? 'rounded-sm' : null"
  >
    <video
      ref="videoPlayer"
      class="oblyk-video-player"
      :style="`aspect-ratio: ${aspectRatio}`"
      preload="none"
      :poster="video.thumbnail_url"
      playsinline
      :controls="fullScreen"
      :muted="muted"
      @click="pauseVideo"
      @waiting="loading = true"
      @canplay="loading = false"
      @ended="endedVideo"
      @timeupdate="timeUpdate"
    >
      <source
        :src="video.oblyk_video.path"
        :type="video.oblyk_video.content_type"
      >
      <p>
        {{ $t('components.video.notSupportVideo') }}
      </p>
    </video>
    <v-slide-y-transition>
      <div
        v-if="!play || ended"
        class="oblyk-video-middle-container"
      >
        <v-btn
          v-if="!ended"
          class="oblyk-video-play-btn"
          dark
          icon
          x-large
          @click="playVideo"
        >
          <v-icon large>
            {{ mdiPlay }}
          </v-icon>
        </v-btn>
        <div v-if="ended">
          <v-btn
            class="oblyk-video-replay-btn"
            dark
            text
            @click="replayVideo"
          >
            <v-icon left>
              {{ mdiReplay }}
            </v-icon>
            {{ $t('actions.replay') }}
          </v-btn>
        </div>
      </div>
    </v-slide-y-transition>
    <div class="oblyk-video-controls d-flex align-end">
      <animate-oblyk-logo
        :animate="loading"
        color="rgb(255,255,255)"
        class="mr-auto"
      />
      <v-btn
        icon
        dark
        @click="muted = !muted"
      >
        <v-icon>
          {{ muted ? mdiVolumeOff : mdiVolumeHigh }}
        </v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        @click="fullScreenVideo"
      >
        <v-icon>
          {{ mdiArrowExpand }}
        </v-icon>
      </v-btn>
    </div>
    <div
      v-if="currentTime !== 0 && duration"
      class="video-progress-container"
      @click.stop="seek"
    >
      <div
        class="video-progress-bar"
        :style="`width: ${currentTime / duration * 100}%`"
      />
    </div>
    <v-chip
      v-if="workInProgress"
      color="rgba(0,0,0,0.5)"
      class="oblyk-video-work-in-progress"
    >
      {{ $t('components.video.workInProgress') }}
    </v-chip>
  </div>
</template>
<script>
import { mdiPlay, mdiArrowExpand, mdiReplay, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo'

export default {
  name: 'OblykVideo',
  components: { AnimateOblykLogo },
  props: {
    video: {
      type: Object,
      required: true
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      play: false,
      fullScreen: false,
      currentTime: 0,
      duration: null,
      muted: true,
      ended: false,
      loading: false,
      workInProgress: false,
      aspectRatio: '4 / 3',

      mdiPlay,
      mdiArrowExpand,
      mdiReplay,
      mdiVolumeHigh,
      mdiVolumeOff
    }
  },

  mounted () {
    this.initVideoPlayer()
  },

  methods: {
    initVideoPlayer () {
      if (![undefined, null].includes(this.video.video_metadata)) {
        if (this.video.video_metadata.width === undefined || this.video.video_metadata.height === undefined) {
          this.aspectRatio = '4 / 3'
        } else {
          const ratio = this.video.video_metadata.width / this.video.video_metadata.height
          this.aspectRatio = [ratio, '1'].join(' / ')
        }
        if (this.video.video_metadata.duration !== undefined) {
          this.duration = this.video.video_metadata.duration
        }
      } else {
        this.workInProgress = true
        this.aspectRatio = ' 4 / 3'
        this.duration = null
      }
    },

    playVideo () {
      this.$refs.videoPlayer.play()
      this.ended = false
      this.play = true
    },

    pauseVideo () {
      this.$refs.videoPlayer.pause()
      this.play = false
    },

    endedVideo () {
      this.ended = true
    },

    replayVideo () {
      this.$refs.videoPlayer.currentTime = 0
      this.playVideo()
    },

    fullScreenVideo () {
      this.$refs.videoPlayer.requestFullscreen()
      this.fullScreen = true
    },

    timeUpdate () {
      this.currentTime = this.$refs.videoPlayer.currentTime
      this.loading = false
      this.ended = false
    },

    seek (event) {
      const bar = event.currentTarget
      const ratio = event.offsetX / bar.offsetWidth
      this.$refs.videoPlayer.currentTime = ratio * this.duration
    }
  }
}
</script>

<style lang="scss">
.oblyk-video {
  position: relative;
  overflow: hidden;
  .oblyk-video-player {
    width: 100%;
    max-height: calc(100vh - 130px);
  }
  .oblyk-video-middle-container {
    text-align: center;
    position: absolute;
    top: calc(50% - 24px);
    width: 100%;
    .oblyk-video-play-btn, .oblyk-video-replay-btn {
      background-color: rgba(0,0,0,0.5);
    }
  }
  .oblyk-video-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 5px 5px;
    .v-chip {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .oblyk-video-work-in-progress {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .oblyk-video-controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 5px 5px;
  }
  .video-progress-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 10px;
    .video-progress-bar {
      border-radius: 2px;
      height: 3px;
      background-color: rgb(255, 255, 255);
    }
  }
  video {
    margin-bottom: -8px;
  }
}
</style>
