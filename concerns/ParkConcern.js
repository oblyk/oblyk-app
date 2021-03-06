import Park from '@/models/Park'

export const ParkConcern = {
  data () {
    return {
      park: null
    }
  },

  async fetch () {
    this.park = await new Park({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId,
      this.$route.params.parkId
    )
  }
}
