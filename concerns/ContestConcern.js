import Contest from '~/models/Contest'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export const ContestConcern = {
  mixins: [ImageVariantHelpers],

  data () {
    return {
      contest: null
    }
  },

  computed: {
    contestMetaTitle () {
      return this.$t('metaTitle', { name: this.contest?.name, gymName: this.contest?.gym?.name })
    },
    contestMetaDescription () {
      return this.$t(
        'metaDescription',
        {
          name: this.contest?.name,
          gymName: this.contest?.gym?.name
        }
      )
    },
    contestMetaImage () {
      if (this.contest && this.contest.attachments.banner.attached) {
        return this.imageVariant(this.contest.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })
      } else if (this.contest && this.contest?.gym && this.contest?.gym?.banner) {
        return this.contest.Gym.bannerUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    contestMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.contest?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name}, contest de %{gymName}',
        metaDescription: "%{name}, inscrivez-vous au contest d'escalade de la salle de %{gymName}"
      },
      en: {
        metaTitle: "%{gymName}'s %{name} contest",
        metaDescription: '%{name} sign up for the %{gymName} climbing contest'
      }
    }
  },

  head () {
    return {
      title: this.contestMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.contestMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.contestMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.contestMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.contestMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.contestMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.contestMetaImage, as: 'image' }
      ]
    }
  },

  async fetch () {
    this.contest = await new Contest({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId,
      this.$route.params.contestId
    )
  }
}
