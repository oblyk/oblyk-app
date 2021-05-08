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
      photos: [],
      areaPhotosMetaTitle: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.title', {
        name: (this.area || {}).name,
        region: (this.area || {}).region
      })}`,
      areaPhotosMetaDescription: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.description', {
        name: (this.area || {}).name,
        region: (this.area || {}).region,
        city: (this.area || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.areaPhotosMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.areaPhotosMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.areaPhotosMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.areaPhotosMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path('guide-books')}`
        }
      ]
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
