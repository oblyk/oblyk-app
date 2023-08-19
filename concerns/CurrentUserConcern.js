import User from '~/models/User'

export const CurrentUserConcern = {
  data () {
    return {
      currentUser: null,
      loadingCurrentUser: true
    }
  },

  created () {
    if (this.$auth.loggedIn) { this.getCurrentUser() }
  },

  methods: {
    getCurrentUser () {
      this.loadingCurrentUser = true
      this.currentUser = new User({ attributes: this.$auth.user })
      this.loadingCurrentUser = false
    }
  }
}
