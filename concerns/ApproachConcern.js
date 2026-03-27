import OblykApi from '~/services/oblyk-api/OblykApi'

export const ApproachConcern = {
  data () {
    return {
      approach: null
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/public/crags/${this.$route.params.cragId}/approaches/${this.$route.params.approachId}`)
      .then((resp) => {
        this.approach = resp.data
      })
  }
}
