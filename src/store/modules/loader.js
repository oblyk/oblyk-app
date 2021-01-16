const state = {
  loading: 0
}

const getters = {
  loading: state => {
    return state.loading
  }
}

const actions = {
  startLoading ({ commit }) {
    commit('START_LOADING')
  },

  finishLoading ({ commit }) {
    commit('START_LOADING')
  }
}

const mutations = {
  START_LOADING: state => state.loading++,
  FINISH_LOADING: state => state.loading--
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
