import User from '@/models/User'

export const SessionConcern = {
  computed: {
    isLoggedIn () {
      return this.$auth.loggedIn
    },

    isSuperAdmin () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.super_admin
      } else {
        return false
      }
    },

    loggedInUser () {
      if (this.$auth.loggedIn) {
        return {
          name: [this.$auth.user.first_name, this.$auth.user.last_name].filter(e => e !== null).join(' '),
          slugName: this.$auth.user.slug_name,
          uuid: this.$auth.user.uuid,
          id: this.$auth.user.id
        }
      } else {
        return {}
      }
    },

    administeredGyms () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.administered_gyms
      } else {
        return []
      }
    },

    myOrganizations () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.organizations
      } else {
        return []
      }
    },

    mySubscribes () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.subscribes
      } else {
        return []
      }
    },

    getToken () {
      if (this.$auth.loggedIn) {
        return this.$auth.$storage.getUniversal('_token.local')
      } else {
        return []
      }
    },

    getWsToken () {
      if (this.$auth.loggedIn) {
        return this.$auth.user.ws_token
      } else {
        return []
      }
    }
  },

  methods: {
    getLoggedInUser () {
      return new Promise((resolve, reject) => {
        resolve(new User({ attributes: this.$auth.user }))
      })
    },

    currentUserIsGymAdmin () {
      if (!this.$auth.loggedIn) { return false }

      const gymId = this.$route.params.gymId

      if (gymId === undefined) { return false }

      for (const gym of this.administeredGyms) {
        if (gym.id === parseInt(gymId)) {
          return true
        }
      }
      return false
    },

    iAmSubscribedToThis (type, id) {
      let IAmSubscribed = 'unsubscribe'
      for (const subscribe of this.mySubscribes) {
        if (subscribe.followable_type === type && subscribe.followable_id === id) {
          IAmSubscribed = subscribe.accepted ? 'subscribe' : 'subscribeRequestMade'
        }
      }
      return IAmSubscribed
    },

    async logout () {
      await this.$auth.logout('local')
    }
  }
}
