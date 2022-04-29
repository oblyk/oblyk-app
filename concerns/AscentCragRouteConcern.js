import AscentCragRoute from '@/models/AscentCragRoute'

export const AscentCragRouteConcern = {
  data () {
    return {
      ascentCragRoute: null
    }
  },

  async fetch () {
    this.ascentCragRoute = await new AscentCragRoute({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.ascentCragRouteId
    )
  }
}
