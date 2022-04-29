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

      // if current user administre gym but the right one
      if (!this.administeredGyms.includes(this.gym.id)) {
        this.$router.push(`${this.gym.path}/administrator-required`)
      }
    }
  }
}
