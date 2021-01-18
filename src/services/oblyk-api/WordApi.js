import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class WordApi extends BaseApi {
  all (page = 1) {
    return axios({
      url: `${this.baseUrl}/words.json?page=${page}`,
      method: 'GET'
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      cancelToken: this.tokenSearchSource.token,
      url: `${this.baseUrl}/words/search.json?query=${query}`,
      method: 'GET'
    })
  }

  find (wordId) {
    return axios({
      url: `${this.baseUrl}/words/${wordId}.json`,
      method: 'GET'
    })
  }

  versions (wordId) {
    return axios({
      url: `${this.baseUrl}/words/${wordId}/versions.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/words/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        word: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/words.json`,
      headers: { Authorization: this.authToken() },
      data: {
        word: data
      },
      method: 'POST'
    })
  }
}
export default new WordApi()
