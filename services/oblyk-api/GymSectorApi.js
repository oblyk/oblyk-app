import BaseApi from '~/services/oblyk-api/BaseApi'

class GymSectorApi extends BaseApi {
  all (gymId, spaceId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  lastRoutesWithPictures (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/last_routes_with_pictures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
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

  bulkUpdate (gymId, gymSpaceId, sectors) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${gymSpaceId}/gym_sectors/bulk_update.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_sectors: sectors
      }
    })
  }

  dismountRoutes (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/dismount_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  deleteThreeDPath (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}/delete_three_d_path.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
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

  delete (gymId, spaceId, sectorId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/gym_sectors/${sectorId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymSectorApi
