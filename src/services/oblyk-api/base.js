import store from '@/store'

export default class BaseApi {
  constructor () {
    this.baseUrl = `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`
  }

  // Get token and uuid from store
  authToken () {
    return `Bearer ${store.getters['auth/getToken']}`
  }
}
