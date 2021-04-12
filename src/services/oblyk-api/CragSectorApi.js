import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragSectorApi extends BaseApi {
  all (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_sectors.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_sectors/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: cragSectorId
      }
    })
  }

  versions (cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  videos (cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (cragId, cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_sectors/${cragSectorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/crag_sectors.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_sector: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/crag_sectors/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_sector: data
      }
    })
  }

  routeFigures (cragSectorId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/route_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default new CragSectorApi()
