import Crag from '@/models/Crag'

export const CragConcern = {
  data () {
    return {
      crag: null,
      dataCrag: null
    }
  },

  computed: {
    cragMetaTitle () {
      return this.$t('meta.crag.title', { name: (this.crag || {}).name, region: (this.crag || {}).region })
    },
    cragMetaDescription () {
      return this.$t('meta.crag.description', { name: (this.crag || {}).name, region: (this.crag || {}).region, city: (this.crag || {}).city })
    },
    cragMetaImage () {
      if (this.crag && this.crag.photo) {
        return this.crag.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    cragMetaUrl () {
      if (this.crag) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}`
      }
    }
  },

  head () {
    return {
      title: this.cragMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.cragMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.cragMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.cragMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.cragMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.cragMetaUrl }
      ]
    }
  },

  async fetch () {
    this.crag = await new Crag({
      axios: this.$axios,
      store: this.$store
    })._find(
      this.$route.params.cragId
    )
  }
}
