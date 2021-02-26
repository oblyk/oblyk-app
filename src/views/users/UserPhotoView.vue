<template>
  <div>
    <spinner v-if="loadingPhotos" />
    <div v-if="!loadingPhotos">
      <photo-gallery :photos-data="photos" />
    </div>
  </div>
</template>

<script>
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'UserPhotoView',
  components: { PhotoGallery, Spinner },
  props: {
    user: Object
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
      UserApi
        .photos(this.user.uuid)
        .then(resp => {
          this.photos = resp.data
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
