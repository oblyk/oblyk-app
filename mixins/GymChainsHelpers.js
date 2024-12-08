export const GymChainsHelpers = {
  methods: {
    currentUserIsGymChainAdmin () {
      if (!this.$auth.loggedIn) { return false }

      return this.$auth.user.gym_chains.map(gymChain => gymChain.id).includes(this.gymChain.id)
    }
  }
}
