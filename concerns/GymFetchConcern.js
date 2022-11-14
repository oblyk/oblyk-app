import Gym from '@/models/Gym'

export const GymFetchConcern = {
  data () {
    return {
      gym: null
    }
  },
  async fetch () {
    this.gym = await new Gym({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.gymId
    )
  }
}
