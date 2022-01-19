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
      store: this.$store
    })._find(
      this.$route.params.ascentCragRouteId
    )
  }
}
