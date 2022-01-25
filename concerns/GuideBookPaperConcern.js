import GuideBookPaper from '@/models/GuideBookPaper'

export const GuideBookPaperConcern = {
  data () {
    return {
      guideBookPaper: null
    }
  },

  computed: {
    guideBookPaperMetaTitle () {
      return this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })
    },
    guideBookPaperMetaDescription () {
      return this.$t('meta.guideBookPaper.description', {
        name: (this.guideBookPaper || {}).name
      })
    },
    guideBookPaperMetaImage () {
      if (this.guideBookPaper) {
        return this.guideBookPaper.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    guideBookPaperMetaUrl () {
      if (this.guideBookPaper) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}`
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
