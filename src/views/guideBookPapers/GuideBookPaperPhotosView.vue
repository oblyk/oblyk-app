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
      loadingPhotos: true,
      guideBookPaperMetaTitle: `
      ${this.$t('meta.generics.pictures')}
      ${this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })}`,
      guideBookPaperMetaDescription: `
      ${this.$t('meta.generics.pictures')}
      ${this.$t('meta.guideBookPaper.description', {
        name: (this.guideBookPaper || {}).name
      })}`
    }
  },

  metaInfo () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path('photos')}`
        }
      ]
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
