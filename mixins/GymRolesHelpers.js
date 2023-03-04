export const GymRolesHelpers = {
  methods: {
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
