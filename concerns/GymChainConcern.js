import GymChain from '@/models/GymChain'

export const GymChainConcern = {
  data () {
    return {
      gymChain: null
    }
  },

  computed: {
    gymChainMetaTitle () {
      return this.$t('metaTitle', { name: this.gymChain?.name })
    },
    gymChainMetaDescription () {
      return this.gymChain?.description
    },
    gymChainMetaImage () {
      if (this.gymChain && this.gymChain.banner) {
        return this.gymChain.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    gymChainMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gymChain?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, réseaux de salles d'escalades"
      },
      en: {
        metaTitle: '%{name}, climbing gyms chains'
      }
    }
  },

  head () {
    return {
      title: this.gymChainMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.gymChainMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.gymChainMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.gymChainMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.gymChainMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.gymChainMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.gymChainMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.gymChain = await new GymChain({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymChainId
    )
  }
}
