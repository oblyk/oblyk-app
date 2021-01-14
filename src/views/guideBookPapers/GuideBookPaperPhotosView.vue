<template>
  <div>
    <spinner v-if="loadingPhotos" />

    <v-container v-if="!loadingPhotos">
      <v-row>
        <v-col>
          <photo-gallery :photos-data="photosData" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'GuideBookPaperPhotosView',
  components: { PhotoGallery, Spinner },

  data () {
    return {
      photosData: [],
      loadingPhotos: true,
      guideBookPaperId: this.$route.params.guideBookPaperId
    }
  },

  mounted () {
    this.getPhotos()
  },

  methods: {
    getPhotos: function () {
      GuideBookPaperApi
        .photos(this.guideBookPaperId)
        .then(resp => {
          this.photosData = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'photo')
        }).then(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
