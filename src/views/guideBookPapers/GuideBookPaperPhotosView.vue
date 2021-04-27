<template>
  <div>
    <spinner v-if="loadingPhotos" />

    <v-container v-if="!loadingPhotos">
      <v-row>
        <v-col>
          <photo-gallery :photos="photos" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import PhotoGallery from '@/components/photos/PhotoGallery'
import Photo from '@/models/Photo'

export default {
  name: 'GuideBookPaperPhotosView',
  components: { PhotoGallery, Spinner },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      photos: [],
      loadingPhotos: true
    }
  },

  mounted () {
    this.getPhotos()
  },

  methods: {
    getPhotos: function () {
      this.photos = []
      GuideBookPaperApi
        .photos(this.guideBookPaper.id)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'photo')
        })
        .then(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
