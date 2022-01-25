import Gym from '@/models/Gym'

export const GymConcern = {
  data () {
    return {
      gym: null
    }
  },

  computed: {
    gymMetaTitle () {
      return this.$t('meta.gym.title', { name: (this.gym || {}).name, city: (this.gym || {}).city })
    },
    gymMetaDescription () {
      return this.$t(
        'meta.gym.description',
        {
          name: (this.gym || {}).name,
          city: (this.gym || {}).city,
          big_city: (this.gym || {}).big_city,
          region: (this.gym || {}).region
        }
      )
    },
    gymMetaImage () {
      if (this.gym && this.gym.banner) {
        return this.gym.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    gymMetaUrl () {
      if (this.gym) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym.path}`
      }
    }
  },

  head () {
    return {
      title: this.gymMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.gymMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.gymMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.gymMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.gymMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.gymMetaUrl }
      ]
    }
  },

  async fetch () {
    this.gym = await new Gym({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId
    )
  }
}
