import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymAdministratorRequestApi extends BaseApi {
  create (data) {
    return axios({
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
export default new GymAdministratorRequestApi()
