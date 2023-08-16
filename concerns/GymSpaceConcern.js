import GymSpace from '@/models/GymSpace'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'

export const GymSpaceConcern = {
  data () {
    return {
      gymSpace: null
    }
  },

  mounted () {
    this.$root.$on('ReFetchGymSpace', (gymSpace) => {
      this.reFetchGymSpace(gymSpace)
    })
  },

  beforeDestroy () {
    this.$root.$off('ReFetchGymSpace')
  },

  computed: {
    gymSpaceMetaTitle () {
      return this.$t('metaTitle', { name: this.gymSpace?.name, gym: this.gymSpace?.gym?.name })
    },
    gymSpaceMetaDescription () {
      return this.$t('metaDescription', { gym: this.gymSpace?.gym?.name })
    },
    gymSpaceMetaImage () {
      if (this.gymSpace && this.gymSpace.gym.banner) {
        return this.gymSpace.Gym.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    gymSpaceMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gymSpace?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name} topo indoor de la salle d'escalade %{gym}",
        metaDescription: "Consulter le détail des voies d'escalade de %{gym}, ajoutez vos croix pour suivre votre progression"
      },
      en: {
        metaTitle: '%{name} indoor guide book of climbing gym %{gym}',
        metaDescription: 'Consult the details of the climbing routes of %{gym}, add your ascents to track your progress'
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
      ],
      link: [
        { rel: 'preload', href: this.gymSpaceMetaImage, as: 'image' }
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
  },

  methods: {
    reFetchGymSpace (gymSpace) {
      if (gymSpace) {
        this.gymSpace = gymSpace
      } else {
        new GymSpaceApi(this.$axios, this.$auth)
          .find(this.gymSpace.id)
          .then((resp) => {
            this.gymSpace = new GymSpace({ attributes: resp.data })
          })
      }
    }
  }
}
