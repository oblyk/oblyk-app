import axios from 'axios'
import BaseApi from '@/services/oblyk-api/base'

class SessionApi extends BaseApi {
  login (data) {
    return axios({
      url: `${this.baseUrl}/sessions/sign_in.json`,
      data: data,
      method: 'POST'
    })
  }

  signUp (data) {
    return axios({
      url: `${this.baseUrl}/sessions/sign_up.json`,
      data: data,
      method: 'POST'
    })
  }

  async refreshSession () {
    return axios({
      url: `${this.baseUrl}/sessions/tokens.json`,
      data: {
        id: this.authId(),
        refresh_token: this.authRefreshToken()
      },
      method: 'POST'
    })
  }
}
export default new SessionApi()
