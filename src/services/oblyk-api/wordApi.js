import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class WordApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/words.json`,
      method: 'GET'
    })
  }

  find (wordId) {
    return axios({
      url: `${this.baseUrl}/words/${wordId}.json`,
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
