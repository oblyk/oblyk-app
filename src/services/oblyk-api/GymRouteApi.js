import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymRouteApi extends BaseApi {
  allInGym (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  allInSpace (gymId, spaceId, groupBy, orderBy) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { group_by: groupBy, order_by: orderBy }
    })
  }

  allInSector (gymId, spaceId, sectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, spaceId, routeId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes/${routeId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routeAscents (gymId, routeId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${routeId}/ascents.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.gym_sector_id}/gym_routes/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_route: data
      }
    })
  }

  dismount (gymId, gymRouteId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/dismount.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  dismountCollection (gymId, gymRouteIds) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/dismount_collection.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        route_ids: gymRouteIds
      }
    })
  }

  mountCollection (gymId, gymRouteIds) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/mount_collection.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        route_ids: gymRouteIds
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.gym_space_id}/gym_sectors/${data.gym_sector_id}/gym_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_route: data
      }
    })
  }
}
export default new GymRouteApi()
