import SessionApi from '@/services/oblyk-api/SessionApi'

// initial state
const state = {
  status: '',
  token: '',
  expired_at: '',
  refresh_token: '',
  name: '',
  slug_name: '',
  super_admin: false,
  uuid: '',
  id: '',
  administered_gyms: [],
  subscribes: [],
  ascent_crag_routes: [],
  tick_list: []
}

// getters
const getters = {
  isLoggedIn: state => {
    return !!state.token
  },

  isSuperAdmin: state => {
    return state.super_admin
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

  getUserUuid: state => {
    return state.uuid
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
  },

  getAscentCragRoutes: state => {
    return state.ascent_crag_routes
  },

  getTickList: state => {
    return state.tick_list
  }
}

// forms
const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('request')
      SessionApi
        .login(data)
        .then(resp => {
          const data = resp.data
          commit('success', {
            token: data.token,
            refresh_token: data.refresh_token,
            expired_at: data.expired_at,
            name: [data.user.first_name, data.user.last_name].join(' '),
            slug_name: data.user.slug_name,
            super_admin: data.user.super_admin || false,
            uuid: data.user.uuid,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes,
            ascent_crag_routes: data.ascent_crag_routes,
            tick_list: data.tick_list
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
          commit('refresh', {
            token: data.token,
            refresh_token: data.refresh_token,
            expired_at: data.expired_at
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
            name: [data.user.first_name, data.user.last_name].join(' '),
            slug_name: data.user.slug_name,
            super_admin: data.user.super_admin || false,
            uuid: data.user.uuid,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes,
            ascent_crag_routes: data.ascent_crag_routes,
            tick_list: data.tick_list
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
            name: [data.user.first_name, data.user.last_name].join(' '),
            slug_name: data.user.slug_name,
            super_admin: data.user.super_admin || false,
            uuid: data.user.uuid,
            id: data.user.id,
            administered_gyms: data.administered_gyms,
            subscribes: data.subscribes,
            ascent_crag_routes: data.ascent_crag_routes,
            tick_list: data.tick_list
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

  updateAscentCragRoutes ({ commit }, data) {
    commit('updatedAscentCragRoutes', {
      ascent_crag_routes: data.ascent_crag_routes
    })
  },

  updateTickList ({ commit }, data) {
    commit('updatedTickList', {
      tick_list: data.tick_list
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
    state.uuid = payload.uuid
    state.id = payload.id
    state.name = payload.name
    state.slug_name = payload.slug_name
    state.super_admin = payload.super_admin
    state.administered_gyms = payload.administered_gyms
    state.subscribes = payload.subscribes
    state.ascent_crag_routes = payload.ascent_crag_routes
    state.tick_list = payload.tick_list
  },

  refresh (state, payload) {
    state.status = 'success'
    state.token = payload.token
    state.refresh_token = payload.refresh_token
    state.expired_at = payload.expired_at
  },

  updated (state, payload) {
    state.name = payload.name
  },

  updatedSubscribes (state, payload) {
    state.subscribes = payload.subscribes
  },

  updatedAscentCragRoutes (state, payload) {
    state.ascent_crag_routes = payload.ascent_crag_routes
  },

  updatedTickList (state, payload) {
    state.tick_list = payload.tick_list
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
    state.super_admin = false
    state.uuid = ''
    state.id = ''
    state.administered_gyms = []
    state.subscribes = []
    state.ascent_crag_routes = []
    state.tick_list = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
