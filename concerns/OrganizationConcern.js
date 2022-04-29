import Organization from '@/models/Organization'

export const OrganizationConcern = {
  data () {
    return {
      organization: null
    }
  },

  computed: {
    organizationMetaTitle () {
      return (this.organization || {}).name
    },
    organizationMetaUrl () {
      if (this.organization) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.organization.path}`
      }
    }
  },

  head () {
    return {
      title: this.organizationMetaTitle,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.organizationMetaTitle },
        { hid: 'og:url', property: 'og:url', content: this.organizationMetaUrl }
      ]
    }
  },

  async fetch () {
    this.organization = await new Organization({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.organizationId
    )
  }
}
