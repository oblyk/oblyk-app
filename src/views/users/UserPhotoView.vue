<template>
  <div>
    <spinner v-if="loadingPhotos" />
    <div v-if="!loadingPhotos">
      <photo-gallery :photos="photos" />
    </div>
  </div>
</template>

<script>
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import Photo from '@/models/Photo'

export default {
  name: 'UserPhotoView',
  components: { PhotoGallery, Spinner },
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
  },

  data () {
    return {
      loadingPhotos: true,
      photos: []
    }
  },

  mounted () {
    this.getPhotos()
  },

  methods: {
    getPhotos: function () {
      this.loadingPhotos = true
      this.photos = []
      UserApi
        .photos(this.user.uuid)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
