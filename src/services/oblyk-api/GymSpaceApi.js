import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymSpaceApi extends BaseApi {
  all (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, spaceId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_space: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_space: data
      }
    })
  }
}
export default new GymSpaceApi()
