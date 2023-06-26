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
      return this.$t('metaTitle', { name: this.crag?.name, region: this.crag?.region })
    },
    cragMetaDescription () {
      return this.$t('metaDescription', { name: this.crag?.name, region: this.crag?.region, city: this.crag?.city })
    },
    cragMetaImage () {
      if (this.crag && this.crag.photo) {
        return this.crag.coverUrl
      } else if (this.crag && this.crag.static_map.url) {
        return this.crag.static_map.url
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    cragMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name}, escalade en %{region}',
        metaDescription: "%{name} : site d'escalade à %{city} en %{region}. Détail des voies, localisation, topos, photos, etc."
      },
      en: {
        metaTitle: '%{name}, climb in %{region}',
        metaDescription: '%{name} : climbing crag in %{city} in %{region}. Details of the routes, location, guide books, photos, etc.'
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
      ],
      link: [
        { rel: 'preload', href: this.cragMetaImage }
      ]
    }
  },

  async fetch () {
    this.crag = await new Crag({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId
    )
  }
}
