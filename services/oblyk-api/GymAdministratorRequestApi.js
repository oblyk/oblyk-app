import BaseApi from '~/services/oblyk-api/BaseApi'

class GymAdministratorRequestApi extends BaseApi {
  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_administration_requests.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_administration_request: data
      }
    })
  }
}
export default GymAdministratorRequestApi
