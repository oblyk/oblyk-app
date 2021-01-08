import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class FollowApi extends BaseApi {
  create (data) {
    return axios({
      url: `${this.baseUrl}/follows.json`,
      headers: { Authorization: this.authToken() },
      data: data,
      method: 'POST'
    })
  }

  delete (data) {
    return axios({
      url: `${this.baseUrl}/follows.json`,
      headers: { Authorization: this.authToken() },
      data: data,
      method: 'DELETE'
    })
  }
}
export default new FollowApi()
