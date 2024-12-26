// States
export const state = () => ({
  theme: 'light'
})

// Getters
export const getters = {
  getTheme: (state) => {
    return state.theme
  }
}

// Actions
export const actions = {
  changeTheme ({ commit }, theme) {
    commit('changeTheme', theme)
  }
}

// Mutations
export const mutations = {
  changeTheme (state, payload) {
    state.theme = payload
  }
}
