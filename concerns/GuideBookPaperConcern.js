import GuideBookPaper from '@/models/GuideBookPaper'

export const GuideBookPaperConcern = {
  data () {
    return {
      guideBookPaper: null
    }
  },

  computed: {
    guideBookPaperMetaTitle () {
      return this.$t('metaTitle', { name: this.guideBookPaper?.name })
    },
    guideBookPaperMetaDescription () {
      return this.$t('metaDescription', { name: this.guideBookPaper?.name })
    },
    guideBookPaperMetaImage () {
      if (this.guideBookPaper) {
        return this.guideBookPaper.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    guideBookPaperMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, topo d'escalade",
        metaDescription: "Voir les informations du topo d'escalade %{name}. Détail des sites, localisations, photos, carte, etc."
      },
      en: {
        metaTitle: '%{name}, climbing guide book',
        metaDescription: 'See the information of %{name}. Crag details, location, photos, map, etc.'
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
          hid: 'og:image',
          property: 'og:image',
          content: this.guideBookPaperMetaImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.guideBookPaperMetaUrl
        }
      ],
      link: [
        { rel: 'preload', href: this.guideBookPaperMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.guideBookPaper = await new GuideBookPaper({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.guideBookPaperId
    )
  }
}
