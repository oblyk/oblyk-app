<template>
  <photo-gallery
    v-if="user"
    gallery-type="CurrentUser"
    :gallery-id="user.uuid"
  />
</template>

<script>
import PhotoGallery from '~/components/photos/PhotoGallery.vue'

export default {
  components: { PhotoGallery },
  props: {
    user: { type: Object, required: true }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes photos'
      },
      en: {
        metaTitle: 'My pictures'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
