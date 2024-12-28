// States
export const state = () => ({
  contestTokens: {}
})

// Getters
export const getters = {
  getContestToken: state => (contestId) => {
    return state.contestTokens[contestId]
  }
}

// Actions
export const actions = {
  setContestToken ({ commit }, params) {
    commit('setContestToken', {
      contestId: params.contestId,
      contestToken: params.token
    })
  },

  resetToken ({ commit }, contestId) {
    commit('resetContestToken', contestId)
  }
}

// Mutations
export const mutations = {
  setContestToken (state, payload) {
    state.contestTokens[payload.contestId] = payload.contestToken
  },

  resetContestToken (state, contestId) {
    state.contestTokens[contestId] = null
  }
}
