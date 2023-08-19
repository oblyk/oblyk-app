import User from '~/models/User'

export const CurrentUserConcern = {
  computed: {
    currentUser () {
      return this.$auth.loggedIn ? new User({ attributes: this.$auth.user }) : null
    }
  }
}
