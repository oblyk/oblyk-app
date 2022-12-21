import ClimbingSession from '~/models/ClimbingSession'

export const ClimbingSessionConcern = {
  data () {
    return {
      climbingSession: null
    }
  },

  async fetch () {
    this.climbingSession = await new ClimbingSession({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.sessionDate
    )
  }
}
