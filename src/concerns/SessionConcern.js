import store from '@/store'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import User from '@/models/User'

export const SessionConcern = {
  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    },

    loggedInUser: function () {
      return {
        name: store.getters['auth/getName'],
        slugName: store.getters['auth/getSlugName'],
        uuid: store.getters['auth/getUserUuid'],
        id: store.getters['auth/getUserId']
      }
    },

    administeredGyms: function () {
      return store.getters['auth/administeredGyms']
    },

    mySubscribes: function () {
      return store.getters['auth/getSubscribes']
    },

    getToken: function () {
      return store.getters['auth/getToken']
    }
  },

  methods: {
    getLoggedInUser: function () {
      return new Promise((resolve, reject) => {
        CurrentUserApi
          .current()
          .then(resp => {
            resolve(new User(resp.data))
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    currentUserIsGymAdmin: function () {
      if (!this.isLoggedIn) return false

      const gymId = this.$route.params.gymId

      if (gymId === undefined) return false

      return (this.administeredGyms.includes(parseInt(gymId)))
    },

    iAmSubscribedToThis: function (type, id) {
      let IAmSubscribed = 'unsubscribe'
      for (const subscribe of this.mySubscribes) {
        if (subscribe.followable_type === type && subscribe.followable_id === id) {
          IAmSubscribed = subscribe.accepted ? 'subscribe' : 'subscribeRequestMade'
        }
      }
      return IAmSubscribed
    },

    loggedInUserUserPath: function (page = '') {
      return `/me/${this.loggedInUser.slugName}/${page}`
    },

    logout: function () {
      store.dispatch('auth/logout')
    }
  }
}
