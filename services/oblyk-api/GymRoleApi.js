import BaseApi from '~/services/oblyk-api/BaseApi'

class GymRoleApi extends BaseApi {
  list () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_roles.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymRoleApi
