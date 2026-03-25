import OblykApi from '~/services/oblyk-api/OblykApi'

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
    await new OblykApi(this.$axios, this.$auth)
      .get(`/public/words/${this.$route.params.wordId}`)
      .then((resp) => {
        this.word = resp.data
      })
  }
}
