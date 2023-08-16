import CragSector from '@/models/CragSector'

export const CragSectorConcern = {
  data () {
    return {
      cragSector: null
    }
  },

  computed: {
    cragSectorMetaTitle () {
      if (this.cragSector) {
        return this.$t('metaTitle', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })
      }
    },
    cragSectorMetaDescription () {
      if (this.cragSector) {
        return this.$t('metaDescription', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })
      }
    },
    cragSectorMetaImage () {
      if (this.cragSector) {
        return this.cragSector.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    cragSectorMetaUrl () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path}`
      }
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, secteur d'escalade de %{crag}",
        metaDescription: "%{name}, secteur d'escalade %{crag} situé à %{city} en %{region}. Détail des voies, localisation, photos, etc."
      },
      en: {
        metaTitle: '%{name}, climbing sector of %{crag}',
        metaDescription: '%{name}, climbing sector of %{crag} located at %{city} in %{region}. Details of the routes, location, photos, etc.'
      }
    }
  },

  head () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.cragSectorMetaImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ],
      link: [
        { rel: 'preload', href: this.cragSectorMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    if (this.$route.params.cragSectorId) {
      this.cragSector = await new CragSector({
        axios: this.$axios,
        auth: this.$auth
      })._find(
        this.$route.params.cragSectorId
      )
    } else {
      this.cragSector = null
    }
  }
}
