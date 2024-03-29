import Word from '@/models/Word'

export const WordConcern = {
  data () {
    return {
      word: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Lexique des terms d'escalade"
      },
      en: {
        metaTitle: 'Glossary of climbing terms'
      }
    }
  },

  head () {
    return {
      title: `${this.word?.name} - ${this.$t('metaTitle')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.word?.definition },
        { hid: 'og:title', property: 'og:title', content: `${this.word?.name} - ${this.$t('metaTitle')}` },
        { hid: 'og:description', property: 'og:description', content: this.word?.definition },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  async fetch () {
    this.word = await new Word({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.wordId
    )
  }
}
