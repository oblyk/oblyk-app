import { SessionConcern } from '@/concerns/SessionConcern'
import User from '~/models/User'

export const CurrentUserConcern = {
  mixins: [SessionConcern],

  data () {
    return {
      currentUser: null,
      loadingCurrentUser: true
    }
  },

  created () {
    if (this.isLoggedIn) { this.getCurrentUser() }
  },

  methods: {
    getCurrentUser () {
      this.loadingCurrentUser = true
      this.currentUser = new User({ attributes: this.$auth.user })
      this.loadingCurrentUser = false
      // this.getLoggedInUser()
      //   .then((user) => {
      //     this.currentUser = user
      //   })
      //   .catch((err) => {
      //     this.$root.$emit('alertFromApiError', err, 'user')
      //   }).finally(() => {
      //     this.loadingCurrentUser = false
      //   })
    }
  }
}
