import BaseApi from '~/services/oblyk-api/BaseApi'

class GymRouteApi extends BaseApi {
  allInGym (gymId, groupBy, orderBy) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { group_by: groupBy, order_by: orderBy }
    })
  }

  allInSpace (gymId, spaceId, groupBy, orderBy) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { group_by: groupBy, order_by: orderBy }
    })
  }

  allInSector (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, spaceId, routeId) {
    const url = spaceId ? `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes/${routeId}.json` : `${this.baseUrl}/gyms/${gymId}/gym_routes/${routeId}.json`
    return this.axios.request({
      method: 'GET',
      url,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routeAscents (gymId, routeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${routeId}/ascents.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  similarSectors (gymId, routeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${routeId}/similar_sectors.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
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
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/dismount.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  dismountCollection (gymId, gymRouteIds) {
    return this.axios.request({
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

  printCollection (gymId, gymRouteIds) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/print.pdf`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      responseType: 'blob',
      params: {
        ids: gymRouteIds
      }
    })
  }

  exportCollection (gymId, gymRouteIds) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/export.csv`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      responseType: 'blob',
      params: {
        ids: gymRouteIds
      }
    })
  }

  mountCollection (gymId, gymRouteIds) {
    return this.axios.request({
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
    return this.axios.request({
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
export default GymRouteApi
