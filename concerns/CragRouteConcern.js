import CragRoute from '@/models/CragRoute'

export const CragRouteConcern = {
  data () {
    return {
      cragRoute: null
    }
  },

  async fetch () {
    this.cragRoute = await new CragRoute({
      axios: this.$axios,
      store: this.$store
    })._find(
      this.$route.params.cragId,
      this.$route.params.cragRouteId
    )
  }
}
