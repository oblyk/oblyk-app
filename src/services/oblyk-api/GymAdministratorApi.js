import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymAdministratorApi extends BaseApi {
  all (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_administrators.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gymId}/gym_administrators.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_administrator: data
      },
      method: 'POST'
    })
  }

  delete (gymId, gymAdministratorId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_administrators/${gymAdministratorId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new GymAdministratorApi()
