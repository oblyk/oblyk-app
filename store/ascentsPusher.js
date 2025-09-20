// States
export const state = () => ({
  gymRoutesAscents: {},
  cragRoutesAscents: {}
})

// Getters
export const getters = {
  gymRoutesAscents: (state) => {
    return state.gymRoutesAscents
  },

  cragRoutesAscents: (state) => {
    return state.cragRoutesAscents
  }
}

// Actions
export const actions = {
  updateGymAscents ({ commit }, data) {
    commit('gymAscentsMutations', data)
  }
}

// Mutations
export const mutations = {
  gymAscentsMutations (state, payload) {
    state.gymRoutesAscents = {}
    for (const gymRouteId in payload) {
      state.gymRoutesAscents[gymRouteId] = payload[gymRouteId]
    }
  }
}
