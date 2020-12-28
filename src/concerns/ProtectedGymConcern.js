export const ProtectedGymConcern = {
  watch: {
    gym: function () {
      this.returnIfAdministered()
    }
  },

  methods: {
    returnIfAdministered: function () {
      // return if gym is not administered
      if (!this.gym.administered) return

      // if current user administre gym but the right one
      if (!this.administeredGyms.includes(this.gym.id)) {
        this.$router.push(this.gym.url('administrator-required'))
      }
    }
  }
}
