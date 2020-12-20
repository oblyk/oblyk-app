import store from '@/store'

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
  }
}
