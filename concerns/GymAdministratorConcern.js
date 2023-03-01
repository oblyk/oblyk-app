import GymAdministrator from '~/models/GymAdministrator'

export const GymAdministratorConcern = {
  data () {
    return {
      gymAdministrator: null
    }
  },

  async fetch () {
    this.gymAdministrator = await new GymAdministrator({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId,
      this.$route.params.gymAdministratorId
    )
  }
}
