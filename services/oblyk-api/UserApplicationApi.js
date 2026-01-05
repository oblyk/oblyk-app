import BaseApi from '~/services/oblyk-api/BaseApi'

class UserApplicationApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/user_applications.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (userApplicationId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/${userApplicationId}.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }

  delete (userApplicationId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/current_users/user_applications/${userApplicationId}.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }
}
export default UserApplicationApi
