import BaseApi from '~/services/oblyk-api/BaseApi'

class SessionApi extends BaseApi {
  login (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/sessions/sign_in.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  resetPassword (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/sessions/reset_password.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  newPassword (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/sessions/new_password.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  signUp (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/sessions/sign_up.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  refreshSession () {
    return this.axios.request({
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
export default SessionApi
