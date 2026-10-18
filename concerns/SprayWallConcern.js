import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export const SprayWallConcern = {
  mixins: [ImageVariantHelpers],

  data () {
    return {
      sprayWall: null
    }
  },

  computed: {
    sprayWallMetaTitle () {
      return this.$t('metaTitle', { name: this.sprayWall?.name })
    },
    sprayWallMetaDescription () {
      return this.$t(
        'metaDescription',
        { name: this.sprayWall?.name }
      )
    },
    sprayWallMetaImage () {
      if (this.sprayWall && this.sprayWall.attachments.picture.attached) {
        return this.imageVariant(this.sprayWall.attachments.picture, { fit: 'scale-down', height: 1920, width: 1920 })
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    sprayWallMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name}',
        metaDescription: 'Consulte les blocs de la communauté et crée les tiens sur le %{name}'
      },
      en: {
        metaTitle: '%{name}',
        metaDescription: 'Check out the community problem and create your own on %{name}'
      }
    }
  },

  head () {
    return {
      title: this.sprayWallMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.sprayWallMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.sprayWallMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.sprayWallMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.sprayWallMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.sprayWallMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.sprayWallMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}`)
      .then((resp) => {
        this.sprayWall = resp.data
      })
  }
}
