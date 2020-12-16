import axios from 'axios'
import store from '@/store'

class OblykApi {
  constructor () {
    this.baseUrl = `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`
  }

  // Get token and uuid from store
  authToken () {
    return `Bearer ${store.getters['auth/getToken']}`
  }

  login (data) {
    return axios({
      url: `${this.baseUrl}/sessions/sign_in.json`,
      data: data,
      method: 'POST'
    })
  }

  // Search
  search (query) {
    return axios({
      url: `${this.baseUrl}/search.json`,
      params: { query: query },
      method: 'GET'
    })
  }

  // crags
  getAllCrags () {
    return axios({
      url: `${this.baseUrl}/crags.json`,
      method: 'GET'
    })
  }

  getCrag (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}.json`,
      method: 'GET'
    })
  }
}

export default new OblykApi()
