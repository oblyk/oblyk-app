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

  createFfmeMyCompet (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/current_users/user_application_ffme_my_compets.json`,
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
export default UserApplicationApi
