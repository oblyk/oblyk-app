import SessionApi from '@/services/oblyk-api/SessionApi'

// initial state
const state = {
  status: '',
  token: '',
  expired_at: '',
  refresh_token: '',
  name: '',
  slug_name: '',
  id: '',
  administered_gyms: [],
  subscribes: []
}

// getters
const getters = {
  isLoggedIn: state => {
    return !!state.token
  },

  expiredAt: state => {
    return new Date(state.expired_at * 1000)
  },

  rememberMe: state => {
    return !!state.refresh_token
  },

  administeredGyms: state => {
    return state.administered_gyms
  },

  getToken: state => {
    return state.token
  },

  getRefreshToken: state => {
    return state.refresh_token
  },

  getUserId: state => {
    return state.id
  },

  getName: state => {
    return state.name
  },

  getSlugName: state => {
    return state.slug_name
  },

  getSubscribes: state => {
    return state.subscribes
  }
}

// forms
const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('request')
      const user = {
        email: data.email,
        password: data.password,
        remember_me: data.rememberMe
      }
      SessionApi
        .login(user)
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            refresh_token: data.refresh_token,
            expired_at: data.expired_at,
            name: `${data.user.first_name} ${data.user.last_name}`,
            slug_name: data.user.slug_name,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes
          })
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },

  async refresh ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('request')
      SessionApi
        .refreshSession()
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            refresh_token: data.refresh_token,
            expired_at: data.expired_at,
            name: `${data.user.first_name} ${data.user.last_name}`,
            slug_name: data.user.slug_name,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes
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
            expired_at: data.expired_at,
            refresh_token: data.refresh_token,
            name: `${data.user.first_name} ${data.user.last_name}`,
            slug_name: data.user.slug_name,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes
          })
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },

  newPassword ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('request')
      SessionApi
        .newPassword(data)
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            expired_at: data.expired_at,
            refresh_token: data.refresh_token,
            name: `${data.user.first_name} ${data.user.last_name}`,
            slug_name: data.user.slug_name,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes
          })
          resolve(resp)
        })
        .catch(err => {
          commit('error')
          reject(err)
        })
    })
  },

  updateUserName ({ commit }, data) {
    commit('updated', {
      name: `${data.first_name} ${data.last_name}`
    })
  },

  updateSubscribes ({ commit }, data) {
    commit('updatedSubscribes', {
      subscribes: data.subscribes
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
    state.refresh_token = payload.refresh_token
    state.expired_at = payload.expired_at
    state.id = payload.id
    state.name = payload.name
    state.slug_name = payload.slug_name
    state.administered_gyms = payload.administered_gyms
    state.subscribes = payload.subscribes
  },

  updated (state, payload) {
    state.name = payload.name
  },

  updatedSubscribes (state, payload) {
    state.subscribes = payload.subscribes
  },

  error (state) {
    state.status = 'error'
  },

  logout (state) {
    state.status = ''
    state.token = ''
    state.expired_at = ''
    state.refresh_token = ''
    state.name = ''
    state.slug_name = ''
    state.id = ''
    state.administered_gyms = []
    state.subscribes = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
