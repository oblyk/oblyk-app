export const ProtectedGymConcern = {
  watch: {
    gym () {
      this.returnIfAdministered()
    }
  },

  methods: {
    returnIfAdministered () {
      // return if gym is not administered
      if (!this.gym.administered) { return }
      if (!this.$auth.loggedIn) { return }

      // if current user administre gym but the right one
      const gymIds = []
      for (const gym of this.$auth.user.administered_gyms) {
        gymIds.push(gym.id)
      }
      if (!gymIds.includes(this.gym.id)) {
        this.$router.push(`${this.gym.path}/administrator-required`)
      }
    }
  }
}
