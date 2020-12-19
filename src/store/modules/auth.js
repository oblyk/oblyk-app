import SessionApi from '@/services/oblyk-api/session'

// initial state
const state = {
  status: '',
  token: '',
  name: ''
}

// getters
const getters = {
  isLoggedIn: state => {
    return !!state.token
  },

  getToken: state => {
    return state.token
  },

  getName: state => {
    return state.name
  }
}

// actions
const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('request')
      const user = { email: data.email, password: data.password }
      SessionApi
        .login(user)
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            name: `${data.user.first_name} ${data.user.last_name}`
          })
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },

  signUp ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('request')
      SessionApi
        .signUp(data)
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            name: `${data.user.first_name} ${data.user.last_name}`
          })
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },

  logout ({ commit }) {
    return new Promise(resolve => {
      commit('logout')
      resolve()
    })
  }
}

// mutations
const mutations = {
  request (state) {
    state.status = 'loading'
  },

  success (state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.uuid = payload.uuid
    state.name = payload.name
  },

  error (state) {
    state.status = 'error'
  },

  logout (state) {
    state.status = ''
    state.token = ''
    state.name = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
