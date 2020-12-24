import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GymSectorApi extends BaseApi {
  all (gymId, spaceId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors.json`,
      method: 'GET'
    })
  }

  find (gymId, spaceId, sectorId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_sector: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_sector: data
      },
      method: 'POST'
    })
  }
}
export default new GymSectorApi()
