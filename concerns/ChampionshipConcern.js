import Championship from '~/models/Championship'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export const ChampionshipConcern = {
  mixins: [ImageVariantHelpers],

  data () {
    return {
      championship: null
    }
  },

  computed: {
    championshipMetaTitle () {
      return this.$t('metaTitle', { name: this.championship?.name })
    },
    championshipMetaDescription () {
      return this.$t(
        'metaDescription',
        {
          name: this.championship?.name,
          description: this.championship?.description
        }
      )
    },
    championshipMetaImage () {
      if (this.championship && this.championship.attachments.banner.attached) {
        return this.imageVariant(this.championship.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })
      } else if (this.championship && this.championship?.gym && this.championship?.gym?.banner) {
        return this.championship.Gym.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    championshipMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.championship?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name}',
        metaDescription: '%{name}, %{description}'
      },
      en: {
        metaTitle: '%{name}',
        metaDescription: '%{name}, %{description}'
      }
    }
  },

  head () {
    return {
      title: this.championshipMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.championshipMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.championshipMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.championshipMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.championshipMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.championshipMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.championshipMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.championship = await new Championship({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId,
      this.$route.params.championshipId
    )
  }
}
