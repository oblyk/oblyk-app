import store from '@/store'

export default class BaseApi {
  constructor () {
    this.baseUrl = `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`
    this.tokenSearchSource = null
  }

  cancelSearch () {
    if (this.tokenSearchSource) this.tokenSearchSource.cancel()
  }

  authUuid () {
    return store.getters['auth/getUserUuid']
  }

  authRefreshToken () {
    return store.getters['auth/getRefreshToken']
  }

  authToken () {
    if (store.getters['auth/getToken']) {
      return `Bearer ${store.getters['auth/getToken']}`
    } else {
      return null
    }
  }
}
