import { SessionConcern } from '@/concerns/SessionConcern'

export const UserCurrentConcern = {
  mixins: [SessionConcern],

  data () {
    return {
      userCurrent: null,
      loadingUserCurrent: true
    }
  },

  created () {
    if (this.isLoggedIn) this.getUserCurrent()
  },

  methods: {
    getUserCurrent: function () {
      this.loadingUserCurrent = true
      this.getCurrentUser()
        .then((user) => {
          this.userCurrent = user
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).finally(() => {
          this.loadingUserCurrent = false
        })
    }
  }
}
