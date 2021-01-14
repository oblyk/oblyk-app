import store from '@/store'

export default class BaseApi {
  constructor () {
    this.baseUrl = `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`
  }

  authId () {
    return store.getters['auth/getUserId']
  }

  authRefreshToken () {
    return store.getters['auth/getRefreshToken']
  }

  authToken () {
    return `Bearer ${store.getters['auth/getToken']}`
  }
}
