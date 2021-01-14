import store from '@/store'
import UserApi from '@/services/oblyk-api/UserApi'
import User from '@/models/User'

export const SessionConcern = {
  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    },

    currentUser: function () {
      return {
        name: store.getters['auth/getName'],
        slugName: store.getters['auth/getSlugName'],
        id: store.getters['auth/getUserId']
      }
    },

    administeredGyms: function () {
      return store.getters['auth/administeredGyms']
    },

    mySubscribes: function () {
      return store.getters['auth/getSubscribes']
    }
  },

  methods: {
    getCurrentUser: function () {
      return new Promise((resolve, reject) => {
        UserApi
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
      let IAmSubscribed = false
      for (const subscribe of this.mySubscribes) {
        if (subscribe.followable_type === type && subscribe.followable_id === id) IAmSubscribed = true
      }
      return IAmSubscribed
    }
  }
}
