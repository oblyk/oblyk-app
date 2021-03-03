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
    const token = store.getters['auth/getToken']

    // reconnecte cable
    await this.$cable.connection.disconnect()
    await this.$cable.connection.connect(`ws://localhost:3000/cable?token=${token}`)

    // change authorization headers
    config.headers.authorization = `Bearer ${token}`
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
      await router.push('/oblyk?unauthorized=true')
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)
