import OblykApi from '~/services/oblyk-api/OblykApi'

export const AscentCragRouteConcern = {
  data () {
    return {
      ascentCragRoute: null
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/ascent_crag_routes/${this.$route.params.ascentCragRouteId}`)
      .then((resp) => {
        this.ascentCragRoute = resp.data
      })
  }
}
