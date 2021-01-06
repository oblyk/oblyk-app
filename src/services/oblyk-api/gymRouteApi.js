import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GymRouteApi extends BaseApi {
  allInGym (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes.json`,
      method: 'GET'
    })
  }

  allInSpace (gymId, spaceId, groupBy, orderBy) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes.json`,
      params: { group_by: groupBy, order_by: orderBy },
      method: 'GET'
    })
  }

  allInSector (gymId, spaceId, sectorId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/gym_routes.json`,
      method: 'GET'
    })
  }

  find (gymId, spaceId, routeId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes/${routeId}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.gym_sector_id}/gym_routes/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_route: data
      },
      method: 'PUT'
    })
  }

  dismount (gymId, gymRouteId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/dismount.json`,
      headers: { Authorization: this.authToken() },
      method: 'PUT'
    })
  }

  picture (data, gymId, gymRouteId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/add_picture.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  thumbnail (data, gymId, gymRouteId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/add_thumbnail.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.gym_sector_id}/gym_routes.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_route: data
      },
      method: 'POST'
    })
  }
}
export default new GymRouteApi()
