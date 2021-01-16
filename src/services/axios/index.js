import axios from 'axios'
import store from '@/store'
import router from '@/router'

// REFRESH TOKEN INTERCEPTORS
axios.interceptors.request.use(async function (config) {
  if (
    store.getters['auth/rememberMe'] && // have tools for refresh token
    store.getters['auth/expiredAt'] < new Date() && // session is expired
    config.url.indexOf('/sessions/token') === -1 // not in refresh token route
  ) {
    await store.dispatch('auth/refresh') // refresh token
    config.headers.authorization = `Bearer ${store.getters['auth/getToken']}`
    return config
  } else {
    return config
  }
})

axios.interceptors.response.use(
  response => response,
  async function (error) {
    // redirect to sign-in page if user not authorized
    if (error.response.status === 401) {
      await store.dispatch('auth/logout')
      await router.push(`/sign-in?redirect_to=${window.location.pathname}`)

      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

// LOADING INTERCEPTORS
axios.interceptors.request.use(config => {
  store.commit('loader/START_LOADING')
  return config
}, error => {
  store.commit('loader/FINISH_LOADING')
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  store.commit('loader/FINISH_LOADING')
  return response
}, error => {
  store.commit('loader/FINISH_LOADING')
  return Promise.reject(error)
})
