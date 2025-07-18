import BaseApi from '~/services/oblyk-api/BaseApi'

class GymRouteApi extends BaseApi {
  paginatedRoutesInGym (gymId, sectorId, orderBy, direction, page, dismounted = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/paginated.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { order_by: orderBy, direction, page, gym_sector_id: sectorId, dismounted }
    })
  }

  paginatedRoutesInSpace (gymId, spaceId, sectorId, orderBy, direction, page, dismounted = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_routes/paginated.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { order_by: orderBy, direction, page, gym_sector_id: sectorId, dismounted }
    })
  }

  all (gymId, routeIds, orderBy, direction, qrcodeLink = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        order_by: orderBy,
        route_ids: routeIds,
        qrcode_link: qrcodeLink,
        direction
      }
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

  comments (gymId, routeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${routeId}/comments.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
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

  mount (gymId, gymRouteId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/mount.json`,
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

  openingSheetCollection (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_routes/opening_sheet_collection.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_opening_sheet: data
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

  deletePicture (gymId, gymRouteId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_routes/${gymRouteId}/delete_picture.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymRouteApi
