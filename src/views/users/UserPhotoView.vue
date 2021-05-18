<template>
  <photo-gallery
    v-if="user"
    gallery-type="User"
    :gallery-id="user.uuid"
  />
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'UserPhotoView',
  components: { PhotoGallery },
  props: {
    user: Object
  },

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.photo.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.photo.description', { name: (this.user || {}).first_name })
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path('photos')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.userMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.userMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.userMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.userMetaDescription },
        { vmid: 'og-url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  }
}
</script>
