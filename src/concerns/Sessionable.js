import store from '@/store'
import UserApi from '@/services/oblyk-api/userApi'
import User from '@/models/User'

export const Sessionable = {
  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    },

    currentUser: function () {
      return {
        name: store.getters['auth/getName']
      }
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
    }
  }
}
