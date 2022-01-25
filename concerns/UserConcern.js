import User from '@/models/User'

export const UserConcern = {
  data () {
    return {
      user: null
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('meta.user.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription () {
      return this.$t('meta.user.description', { name: (this.user || {}).first_name })
    },
    userMetaImage () {
      if (this.user && this.user.banner) {
        return this.user.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path}`
      }
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.userMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  async fetch () {
    this.user = await new User({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.userUuid
    )
  }
}
