<template>
  <v-container>
    <spinner v-if="loadingPhotos" />

    <div v-if="!loadingPhotos">
      <v-btn
        :to="`/photos/Crag/${cragId}/new?redirect_to=${this.$route.fullPath}`"
        text
        color="primary"
        v-if="isLoggedIn"
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <photo-gallery :photos-data="photos" />
    </div>
  </v-container>
</template>

<script>
import CragApi from '@/services/oblyk-api/cragApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragPhotosView',
  components: { PhotoGallery, Spinner },
  mixins: [SessionConcern],

  data () {
    return {
      loadingPhotos: true,
      photos: [],
      cragId: this.$route.params.cragId
    }
  },

  mounted () {
    this.getPhotos()
  },

  methods: {
    getPhotos: function () {
      CragApi
        .photos(this.cragId)
        .then(resp => {
          this.photos = resp.data
        }).catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
