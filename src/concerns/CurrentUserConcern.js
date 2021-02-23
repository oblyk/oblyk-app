import { SessionConcern } from '@/concerns/SessionConcern'

export const CurrentUserConcern = {
  mixins: [SessionConcern],

  data () {
    return {
      currentUser: null,
      loadingCurrentUser: true
    }
  },

  created () {
    if (this.isLoggedIn) this.getCurrentUser()
  },

  methods: {
    getCurrentUser: function () {
      this.loadingCurrentUser = true
      this.getLoggedInUser()
        .then(user => {
          this.currentUser = user
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).finally(() => {
          this.loadingCurrentUser = false
        })
    }
  }
}
