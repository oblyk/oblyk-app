export const GymRolesHelpers = {
  methods: {
    currentUserIsGymAdmin () {
      if (!this.$auth.loggedIn) { return false }

      return this.$auth.user.administered_gyms.map(gym => gym.id).includes(this.gym.id)
    },

    userCanTouch () {
      if (!this.$auth.loggedIn) { return false }
      if (!this.gym.administered) { return true }

      return this.currentUserIsGymAdmin()
    },

    gymAuthCan (gym, action) {
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === gym.id)
      for (const role of (administeredGym.roles || [])) {
        if (role === action) {
          return true
        }
      }
      return false
    }
  }
}
