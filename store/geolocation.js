// States
export const state = {
  latitude: null,
  longitude: null,
  status: null
}

// Getters
export const getters = {
  IAmGeolocated: (state) => {
    return state.longitude !== null && state.latitude !== null
  }
}

// Actions
export const actions = {
  setLocation ({ commit }, data) {
    commit(
      'successGeolocation',
      {
        latitude: data.latitude,
        longitude: data.longitude
      }
    )
  },

  activateLocation ({ commit }) {
    commit('activate')
  },

  deactivateLocation ({ commit }) {
    commit('deactivate')
  }
}

// Mutations
export const mutations = {
  successGeolocation (state, payload) {
    state.latitude = payload.latitude
    state.longitude = payload.longitude
  },

  activate (state) {
    state.status = 'activate'
  },

  deactivate (state) {
    state.latitude = null
    state.latitude = null
    state.status = 'deactivate'
  }
}
