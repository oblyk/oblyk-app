<template>
  <v-container>
    <spinner v-if="loadingPhotos" :full-height="false"/>
    <div v-if="!loadingPhotos">
      <photo-gallery
        environnement-type="area"
        :environnement-object="area"
        :photos="photos"
      />
    </div>
  </v-container>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import AreaApi from '@/services/oblyk-api/AreaApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import Photo from '@/models/Photo'

export default {
  name: 'AreaPhotosView',
  components: { PhotoGallery, Spinner },
  mixins: [SessionConcern],
  props: {
    area: Object
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
      AreaApi
        .photos(this.area.id)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
