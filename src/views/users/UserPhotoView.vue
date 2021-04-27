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
