<template>
  <photo-gallery
    v-if="area"
    environnement-type="area"
    :environnement-object="area"
    gallery-type="Area"
    :gallery-id="area.id"
  />
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  components: { PhotoGallery },
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      areaPhotosMetaTitle: this.$t('metaTitle', {
        name: this.area?.name,
        region: this.area?.region
      }),
      areaPhotosMetaDescription: this.$t('metaDescription', {
        name: this.area?.name,
        region: this.area?.region,
        city: this.area?.city
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les photos de %{name}, Groupe de sites d'escalade",
        metaDescription: "Voir les photos du groupe de sites d'escalade de %{name}, quels spots de grimpe il présente ou encore quelle variété de cotations on y trouve"
      },
      en: {
        metaTitle: 'Pictures of %{name}, climbing crags group',
        metaDescription: 'See the pictures of the group of climbing sites of %{name}, what kind of climbing spots it offers or what variety of grades can be found there'
      }
    }
  },

  head () {
    return {
      titleTemplate: this.areaPhotosMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.areaPhotosMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.areaPhotosMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.areaPhotosMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path}/photos`
        }
      ]
    }
  }
}
</script>
