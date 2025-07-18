// States
export const state = () => ({
  oblykEnvironment: null
})

// Getters
export const getters = {
  getOblykEnvironnement: (state) => {
    return state.oblykEnvironment
  }
}

// Actions
export const actions = {
  changeOblykEnvironnement ({ commit }, environnent) {
    commit('changeOblykEnvironnement', environnent)
  }
}

// Mutations
export const mutations = {
  changeOblykEnvironnement (state, payload) {
    state.oblykEnvironment = payload
  }
}
