// States
export const state = () => ({
  newNotification: false
})

// Getters
export const getters = {
  haveNewNotification: (state) => {
    return state.newNotification
  }
}

// Actions
export const actions = {
  changeNotificationStatus ({ commit }, newNotification) {
    commit('changeNotificationStatus', newNotification)
  }
}

// Mutations
export const mutations = {
  changeNotificationStatus (state, payload) {
    state.newNotification = payload
  }
}
