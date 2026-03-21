<template>
  <div v-if="publication.attachables_count > 0 && photos.length > 0">
    <oblyk-carousel
      :show-arrow="!$vuetify.breakpoint.mobile"
      :show-arrows-on-hover="!$vuetify.breakpoint.mobile"
    >
      <oblyk-carousel-item
        v-for="(photo, photoIndex) in photos"
        :key="`photo-index-${photoIndex}`"
      >
        <v-img
          :src="photo.src"
          :aspect-ratio="aspectRatio"
          cover
        >
          <v-img
            :src="photo.src"
            :aspect-ratio="aspectRatio"
            style="backdrop-filter: blur(4px)"
            contain
          />
        </v-img>
      </oblyk-carousel-item>
    </oblyk-carousel>
  </div>
</template>

<script>
import { mdiCircleMedium } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykCarousel from '~/components/ui/OblykCarousel.vue'
import OblykCarouselItem from '~/components/ui/OblykCarouselItem.vue'

export default {
  name: 'PublicationAttachmentPhotos',
  components: { OblykCarouselItem, OblykCarousel },
  mixins: [ImageVariantHelpers],
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
    photos () {
      const photos = []
      for (const attachment of this.publication.publication_attachments) {
        if (attachment.attachable_type === 'Photo') {
          const photo = attachment.attachable
          photo.src = this.imageVariant(photo.attachments.picture, { fit: 'scale-down', width: 720, height: 720 })
          photos.push(photo)
        }
      }
      return photos
    },

    aspectRatio () {
      let ratio = 1.5
      const ratios = []
      for (const attachment of this.publication.publication_attachments) {
        if (attachment.attachable_type === 'Photo') {
          const photo = attachment.attachable
          if (photo.photo_width === null || photo.photo_height === null) {
            continue
          }
          ratios.push(photo.photo_width / photo.photo_height)
        }
      }
      if (ratios.length > 0) {
        ratio = Math.min.apply(null, ratios)
        ratio = ratio < 0.5 ? 0.5 : ratio
        return ratio
      } else {
        return ratio
      }
    }
  }
}
</script>
