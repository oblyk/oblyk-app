import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class WordApi extends BaseApi {
  all (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/words.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/words/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (wordId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/words/${wordId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (wordId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/words/${wordId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/words/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        word: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/words.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        word: data
      }
    })
  }
}
export default new WordApi()
