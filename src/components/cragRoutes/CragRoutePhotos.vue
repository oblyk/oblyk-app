<template>
  <div>
    <p>
      <v-icon left>
        mdi-image
      </v-icon>
      {{ $t('components.gallery.title') }}
    </p>

    <spinner v-if="loadingPhotos" :full-height="false"/>
    <div v-if="!loadingPhotos">
      <photo-gallery
        :photos-data="photos"
        :lg-col="lgCol"
      />
      <p class="text-right">
        <v-btn
          :to="`/photos/CragRoute/${cragRoute.id}/new?redirect_to=${this.$route.fullPath}`"
          text
          small
          color="primary"
          v-if="isLoggedIn"
        >
          <v-icon small left>
            mdi-image-plus
          </v-icon>
          {{ $t('actions.addPicture') }}
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'

export default {
  name: 'CragRoutePhotos',
  components: { PhotoGallery, Spinner },
  mixins: [SessionConcern],
  props: {
    cragRoute: Object,
    lgCol: String
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
      CragRouteApi
        .photos(this.cragRoute.id)
        .then(resp => {
          this.photos = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>
