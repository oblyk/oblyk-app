// States
export const state = {
  likes: {}
}

// Getters
export const getters = {
  storedLikes: (state) => {
    return state.likes
  }
}

// Actions
export const actions = {
  storeLikes ({ commit }, likes) {
    commit('storeLike', likes)
  }
}

// Mutations
export const mutations = {
  storeLike (state, payload) {
    state.likes = payload
  }
}
