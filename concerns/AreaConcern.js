import Area from '@/models/Area'

export const AreaConcern = {
  data () {
    return {
      area: null
    }
  },

  computed: {
    areaMetaTitle () {
      return this.$t('metaTitle', { name: this.area?.name })
    },
    areaMetaDescription () {
      return this.$t('metaDescription', { name: this.area?.name })
    },
    areaMetaImage () {
      if (this.area && this.area.photo) {
        return this.area.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    areaMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.area?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, Groupe de sites d'escalade",
        metaDescription: "Voir le résumé du groupe de sites d'escalade de %{name}, quels spots de grimpe il présente ou encore quelle variété de cotations on y trouve"
      },
      en: {
        metaTitle: '%{name}, climbing crags group',
        metaDescription: 'See the summary of the group of climbing sites of %{name}, what kind of climbing spots it offers or what variety of grades can be found there'
      }
    }
  },

  head () {
    return {
      title: this.areaMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.areaMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.areaMetaTitle
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.areaMetaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.areaMetaImage
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.areaMetaUrl
        }
      ],
      link: [
        { rel: 'preload', href: this.areaMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.area = await new Area({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.areaId
    )
  }
}
