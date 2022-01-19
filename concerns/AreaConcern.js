import Area from '@/models/Area'

export const AreaConcern = {
  data () {
    return {
      area: null
    }
  },

  computed: {
    areaMetaTitle () {
      return this.$t('meta.area.title', {
        name: (this.area || {}).name
      })
    },
    areaMetaDescription () {
      return this.$t('meta.area.description', {
        name: (this.area || {}).name
      })
    },
    areaMetaImage () {
      if (this.area && this.area.photo) {
        return this.area.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    areaMetaUrl () {
      if (this.area) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path}`
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
      ]
    }
  },

  async fetch () {
    this.area = await new Area({
      axios: this.$axios,
      store: this.$store
    })._find(
      this.$route.params.areaId
    )
  }
}
