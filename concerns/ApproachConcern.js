import Approach from '@/models/Approach'

export const ApproachConcern = {
  data () {
    return {
      approach: null
    }
  },

  async fetch () {
    this.approach = await new Approach({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId,
      this.$route.params.approachId
    )
  }
}
