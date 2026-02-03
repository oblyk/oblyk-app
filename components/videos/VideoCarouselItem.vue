<template>
  <div
    v-if="video.video_service !== 'oblyk_video'"
    v-html="video.embedded_code"
  />
  <div
    v-else
    style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"
  >
    <video
      style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;"
      controls
    >
      <source
        :src="video.oblyk_video.path"
        :type="video.oblyk_video.content_type"
      >
      <p>
        {{ $t('components.video.notSupportVideo') }}
      </p>
    </video>
  </div>
</template>

<script>
export default {
  name: 'VideoCarouselItem',
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
