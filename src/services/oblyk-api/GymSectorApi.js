import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymSectorApi extends BaseApi {
  all (gymId, spaceId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, spaceId, sectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_sector: data
      }
    })
  }

  dismountRoutes (gymId, spaceId, sectorId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/dismount_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_sector: data
      }
    })
  }
}
export default new GymSectorApi()
