import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  current () {
    return axios({
      url: `${this.baseUrl}/users/current.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  subscribes () {
    return axios({
      url: `${this.baseUrl}/users/current/subscribes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  library () {
    return axios({
      url: `${this.baseUrl}/users/current/library.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/users/current.json`,
      headers: { Authorization: this.authToken() },
      data: {
        user: data
      },
      method: 'PUT'
    })
  }

  avatar (data) {
    return axios({
      url: `${this.baseUrl}/users/current/avatar.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  banner (data) {
    return axios({
      url: `${this.baseUrl}/users/current/banner.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }
}
export default new UserApi()
