import User from '@/models/User'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export const UserConcern = {
  mixins: [ImageVariantHelpers],

  data () {
    return {
      user: null
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('metaTitle', { name: this.user?.first_name })
    },
    userMetaDescription () {
      return this.$t('metaDescription', { name: this.user?.first_name })
    },
    userMetaImage () {
      if (this.user && this.user.attachments.banner) {
        return this.imageVariant(this.user.attachments.banner, { fit: 'scale-down', height: 1920, width: 1920 })
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.path}`
      }
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} son profil de grimpeur·euse',
        metaDescription: 'Consulter le profil de %{name}, grimpeur·euse de la communauté Oblyk'
      },
      en: {
        metaTitle: '%{name} his climbing profile',
        metaDescription: 'View the profile of  %{name}, climber of the community Oblyk'
      }
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.userMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.userMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.user = await new User({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.userName
    )
  }
}
