import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymAdministratorApi extends BaseApi {
  all (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_administrators.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gymId}/gym_administrators.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_administrator: data
      }
    })
  }

  delete (gymId, gymAdministratorId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_administrators/${gymAdministratorId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new GymAdministratorApi()
