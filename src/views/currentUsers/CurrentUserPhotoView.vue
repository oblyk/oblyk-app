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
  name: 'CurrentUserPhotoView',
  components: { PhotoGallery },
  props: {
    user: Object
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.photos')
    }
  }
}
</script>
