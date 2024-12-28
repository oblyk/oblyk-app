// States
export const state = () => ({
  lang: 'fr'
})

// Getters
export const getters = {
  getLang: (state) => {
    return state.lang
  }
}

// Actions
export const actions = {
  changeLang ({ commit }, lang) {
    commit('changeLang', lang)
  }
}

// Mutations
export const mutations = {
  changeLang (state, payload) {
    state.lang = payload
  }
}
