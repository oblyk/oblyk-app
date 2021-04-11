import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class FollowApi extends BaseApi {
  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/follows.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: data
    })
  }

  increment (followableType, followableId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/follows/increment.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        followable_type: followableType,
        followable_id: followableId
      }
    })
  }

  delete (data) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/follows.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: data
    })
  }
}
export default new FollowApi()
