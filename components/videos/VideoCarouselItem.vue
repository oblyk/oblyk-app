<template>
  <div
    v-if="video.video_service !== 'oblyk_video'"
    v-html="video.embedded_code"
  />
  <div v-else>
    <oblyk-video :video="video" />
  </div>
</template>

<script>
import OblykVideo from '~/components/ui/OblykVideo'

export default {
  name: 'VideoCarouselItem',
  components: { OblykVideo },
  props: {
    video: {
      type: Object,
      required: true
    },
    getVideos: {
      type: Function,
      default: null
    },
    lastRead: {
      type: String,
      default: null
    }
  },

  head () {
    return {
      script: [
        { src: 'https://cdn.iframe.ly/embed.js' }
      ]
    }
  }
}
</script>
