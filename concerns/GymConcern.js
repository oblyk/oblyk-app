import Gym from '@/models/Gym'

export const GymConcern = {
  data () {
    return {
      gym: null
    }
  },

  computed: {
    gymMetaTitle () {
      return this.$t('metaTitle', { name: this.gym?.name, city: this.gym?.city })
    },
    gymMetaDescription () {
      return this.$t(
        'metaDescription',
        {
          name: this.gym?.name,
          city: this.gym?.city,
          big_city: this.gym?.big_city,
          region: this.gym?.region
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
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name}, salle d'escalade à %{city}",
        metaDescription: "%{name} est une salle d'escalade à %{city} en %{region} (proche de %{big_city}). consultez la localisation, les photos, le topo, etc."
      },
      en: {
        metaTitle: '%{name}, climbing gym in  %{city}',
        metaDescription: '%{name} is a climbing gym in  %{city} in %{region} (near to %{big_city}). consult the location, photos, indoor guide, etc.'
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
      ],
      link: [
        { rel: 'preload', href: this.gymMetaImage, as: 'image' }
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
