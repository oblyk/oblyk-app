<template>
  <div v-if="publication.attachables_count > 0 && photos.length > 0">
    <v-carousel
      v-model="slide"
      height="auto"
      hide-delimiter-background
      :show-arrows="false"
      :hide-delimiters="photos.length === 1"
    >
      <v-carousel-item
        v-for="(photo, photoIndex) in photos"
        :key="`photo-index-${photoIndex}`"
      >
        <v-img
          :src="photo.src"
          class="rounded-sm"
          aspect-ratio="1.33"
          cover
        >
          <v-img
            :src="photo.src"
            class="rounded-sm"
            aspect-ratio="1.33"
            style="backdrop-filter: blur(4px)"
            contain
          />
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mdiCircleMedium } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'PublicationAttachmentPhotos',
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
    }
  }
}
</script>
