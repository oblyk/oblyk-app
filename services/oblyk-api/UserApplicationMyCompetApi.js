import BaseApi from '~/services/oblyk-api/BaseApi'

class UserApplicationMyCompetApi extends BaseApi {
  find () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/user_application_my_compets.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/current_users/user_application_my_compets.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      },
      data: {
        application: data
      }
    })
  }
}
export default UserApplicationMyCompetApi
