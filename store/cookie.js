// States
export const state = {
  okCookie: false
}

// Getters
export const getters = {
  showCookiePopup: (state) => {
    return state.okCookie === false
  }
}

// Actions
export const actions = {
  acceptCookies ({ commit }) {
    commit('accepted')
  }
}

// Mutations
export const mutations = {
  accepted (state) {
    state.okCookie = true
  }
}
