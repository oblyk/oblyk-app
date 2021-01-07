import { SessionConcern } from '@/concerns/SessionConcern'

export const MeUserConcern = {
  mixins: [SessionConcern],

  data () {
    return {
      meUser: null,
      loadingMeUser: true
    }
  },

  created () {
    if (this.isLoggedIn) this.getMeUser()
  },

  methods: {
    getMeUser: function () {
      this.loadingMeUser = true
      this.getCurrentUser()
        .then((user) => {
          this.meUser = user
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).finally(() => {
          this.loadingMeUser = false
        })
    }
  }
}
