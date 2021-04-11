import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AuthorApi extends BaseApi {
  find (authorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/authors/${authorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/authors/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        author: data
      }
    })
  }

  cover (data, authorId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/authors/${authorId}/add_cover.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }
}
export default new AuthorApi()
