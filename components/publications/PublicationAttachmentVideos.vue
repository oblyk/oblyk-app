<template>
  <div v-if="publication.attachables_count > 0 && videos.length > 0">
    <oblyk-carousel
      :show-arrow="$vuetify.breakpoint.mobile"
      :show-arrows-on-hover="!$vuetify.breakpoint.mobile"
    >
      <oblyk-carousel-item
        v-for="(video, videoIndex) in videos"
        :key="`video-index-${videoIndex}`"
      >
        <video-carousel-item :video="video" />
      </oblyk-carousel-item>
    </oblyk-carousel>
  </div>
</template>

<script>
import { mdiCircleMedium } from '@mdi/js'
import VideoCarouselItem from '~/components/videos/VideoCarouselItem'
import OblykCarousel from '~/components/ui/OblykCarousel.vue'
import OblykCarouselItem from '~/components/ui/OblykCarouselItem.vue'

export default {
  name: 'PublicationAttachmentVideos',
  components: { OblykCarouselItem, OblykCarousel, VideoCarouselItem },
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
