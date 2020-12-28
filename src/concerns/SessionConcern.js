import store from '@/store'
import UserApi from '@/services/oblyk-api/userApi'
import User from '@/models/User'

export const SessionConcern = {
  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    },

    currentUser: function () {
      return {
        name: store.getters['auth/getName']
      }
    },

    administeredGyms: function () {
      return store.getters['auth/administeredGyms']
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
    }
  }
}
