import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GymSpaceApi extends BaseApi {
  all (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces.json`,
      method: 'GET'
    })
  }

  find (gymId, spaceId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_space: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_space: data
      },
      method: 'POST'
    })
  }
}
export default new GymSpaceApi()
