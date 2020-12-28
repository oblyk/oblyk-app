import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GymAdministratorRequestApi extends BaseApi {
  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_administration_requests.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_administration_request: data
      },
      method: 'POST'
    })
  }
}
export default new GymAdministratorRequestApi()
