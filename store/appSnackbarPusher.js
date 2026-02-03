// States
export const state = () => ({
  message: '',
  color: 'success',
  to: null,
  pushKey: 0
})

// Getters
export const getters = {
  appSnackbar: (state) => {
    return {
      message: state.message,
      color: state.color,
      to: state.to
    }
  }
}

// Actions
export const actions = {
  pushAppSnackbar ({ commit }, data) {
    commit('pushAppSnackbarMutation', data)
  }
}

// Mutations
export const mutations = {
  pushAppSnackbarMutation (state, payload) {
    console.log(payload)
    state.to = payload.to || null
    state.message = payload.message
    state.color = payload.color || 'success'
    state.pushKey += 1
  }
}
