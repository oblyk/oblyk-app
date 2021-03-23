import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AuthorApi extends BaseApi {
  find (authorId) {
    return axios({
      url: `${this.baseUrl}/authors/${authorId}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/authors/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        author: data
      },
      method: 'PUT'
    })
  }

  cover (data, authorId) {
    return axios({
      url: `${this.baseUrl}/authors/${authorId}/add_cover.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }
}
export default new AuthorApi()
