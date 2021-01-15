<template>
  <v-row>
    <v-col
      v-for="(photo, index) in photos()"
      :key="`photo-${index}`"
      class="col-12 col-md-4 col-lg-2 d-flex child-flex"
    >
      <photo-thumbnail :photo="photo" />
    </v-col>
    <v-col
      v-if="photos().length === 0"
    >
      <p class="text-center text--disabled mt-5 mb-5">
        {{ $t('components.photo.noPhoto') }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import Photo from '@/models/Photo'
import PhotoThumbnail from '@/components/photos/PhotoThumbnail'

export default {
  name: 'PhotoGallery',
  components: { PhotoThumbnail },
  props: {
    photosData: Array
  },

  methods: {
    photos: function () {
      const photos = []
      for (const photo of this.photosData) {
        photos.push(new Photo(photo))
      }
      return photos
    }
  }
}
</script>
