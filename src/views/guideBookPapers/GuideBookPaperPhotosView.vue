<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <photo-gallery
            gallery-type="GuideBookPaper"
            :gallery-id="guideBookPaper.id"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'GuideBookPaperPhotosView',
  components: { PhotoGallery },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
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
  }
}
</script>
