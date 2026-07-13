import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export const AreaConcern = {
  mixins: [ImageVariantHelpers],

  data () {
    return {
      area: null
    }
  },

  computed: {
    areaMetaTitle () {
      return this.$t('metaTitle', { name: this.area?.name })
    },
    areaMetaDescription () {
      return this.$t('metaDescription', { name: this.area?.name })
    },
    areaMetaImage () {
      if (this.area && this.area.photo.attachments.picture.attached) {
        return this.imageVariant(this.area.photo.attachments.picture, { fit: 'scale-down', width: 1920, height: 1920 })
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    areaMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.area?.app_path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, Groupe de sites d'escalade",
        metaDescription: "Voir le résumé du groupe de sites d'escalade de %{name}, quels spots de grimpe il présente ou encore quelle variété de cotations on y trouve"
      },
      en: {
        metaTitle: '%{name}, climbing crags group',
        metaDescription: 'See the summary of the group of climbing sites of %{name}, what kind of climbing spots it offers or what variety of grades can be found there'
      }
    }
  },

  head () {
    return {
      title: this.areaMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.areaMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.areaMetaTitle
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.areaMetaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.areaMetaImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.areaMetaUrl
        }
      ],
      link: [
        { rel: 'preload', href: this.areaMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/public/areas/${this.$route.params.areaId}`)
      .then((resp) => {
        this.area = resp.data
      })
  }
}
