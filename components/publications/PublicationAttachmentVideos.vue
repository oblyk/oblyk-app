<template>
  <div v-if="publication.attachables_count > 0 && videos.length > 0">
    <v-carousel
      v-model="slide"
      height="auto"
      hide-delimiter-background
      :show-arrows="false"
      :hide-delimiters="videos.length === 1"
    >
      <v-carousel-item
        v-for="(video, videoIndex) in videos"
        :key="`video-index-${videoIndex}`"
      >
        <video-carousel-item :video="video" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mdiCircleMedium } from '@mdi/js'
import VideoCarouselItem from '~/components/videos/VideoCarouselItem'

export default {
  name: 'PublicationAttachmentVideos',
  components: { VideoCarouselItem },
  props: {
    publication: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      slide: 0,

      mdiCircleMedium
    }
  },

  computed: {
    videos () {
      const videos = []
      for (const attachment of this.publication.publication_attachments) {
        if (attachment.attachable_type === 'Video') {
          const video = attachment.attachable
          videos.push(video)
        }
      }
      return videos
    }
  }
}
</script>
