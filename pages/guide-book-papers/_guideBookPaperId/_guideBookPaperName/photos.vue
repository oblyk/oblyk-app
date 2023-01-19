<template>
  <v-row>
    <v-col>
      <photo-gallery
        gallery-type="GuideBookPaper"
        :gallery-id="guideBookPaper.id"
      />
    </v-col>
  </v-row>
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'GuideBookPaperPhotosView',
  components: { PhotoGallery },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      guideBookPaperMetaTitle: this.$t('metaTitle', {
        name: this.guideBookPaper?.name
      }),
      guideBookPaperMetaDescription: this.$t('metaDescription', {
        name: this.guideBookPaper?.name
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les photos de %{name}, topo d'escalade",
        metaDescription: "Voir les photos du topo d'escalade %{name}."
      },
      en: {
        metaTitle: 'Pictures of %{name}, climbing guide book',
        metaDescription: 'See the pictures of %{name} climbing guide book'
      }
    }
  },

  head () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/photos`
        }
      ]
    }
  }
}
</script>
