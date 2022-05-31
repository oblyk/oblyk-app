<template>
  <photo-gallery
    v-if="user"
    gallery-type="CurrentUser"
    :gallery-id="user.uuid"
  />
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  components: { PhotoGallery },
  props: {
    user: { type: Object, required: true }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.photos')
    }
  }
}
</script>
