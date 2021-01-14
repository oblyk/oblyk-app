import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class FollowApi extends BaseApi {
  create (data) {
    return axios({
      url: `${this.baseUrl}/follows.json`,
      headers: { Authorization: this.authToken() },
      data: data,
      method: 'POST'
    })
  }

  increment (followableType, followableId) {
    return axios({
      url: `${this.baseUrl}/follows/increment.json`,
      headers: { Authorization: this.authToken() },
      data: {
        followable_type: followableType,
        followable_id: followableId
      },
      method: 'PUT'
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
