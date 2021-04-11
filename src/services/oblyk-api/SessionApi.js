import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class SessionApi extends BaseApi {
  login (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/sessions/sign_in.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }

  resetPassword (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/sessions/reset_password.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }

  newPassword (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/sessions/new_password.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }

  signUp (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/sessions/sign_up.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }

  async refreshSession () {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/sessions/tokens.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: {
        uuid: this.authUuid(),
        refresh_token: this.authRefreshToken()
      }
    })
  }
}
export default new SessionApi()
