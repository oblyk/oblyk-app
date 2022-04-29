import GymSpace from '@/models/GymSpace'

export const GymSpaceConcern = {
  data () {
    return {
      gymSpace: null
    }
  },

  computed: {
    gymSpaceMetaTitle () {
      if (this.gymSpace) {
        return this.$t('meta.gym.space.title', { name: this.gymSpace.name, gym: this.gymSpace.gym.name })
      }
    },
    gymSpaceMetaDescription () {
      if (this.gymSpace) {
        return this.$t('meta.gym.space.description', { gym: this.gymSpace.gym.name })
      }
    },
    gymSpaceMetaImage () {
      if (this.gymSpace && this.gymSpace.gym.banner) {
        return this.gymSpace.Gym.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    gymSpaceMetaUrl () {
      if (this.gymSpace) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gymSpace.path}`
      }
    }
  },

  head () {
    return {
      title: this.gymSpaceMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.gymSpaceMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.gymSpaceMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.gymSpaceMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.gymSpaceMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.gymSpaceMetaUrl }
      ]
    }
  },

  async fetch () {
    this.gymSpace = await new GymSpace({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId,
      this.$route.params.gymSpaceId
    )
  }
}
