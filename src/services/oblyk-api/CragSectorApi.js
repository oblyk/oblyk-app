import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragSectorApi extends BaseApi {
  all (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/crag_sectors.json`,
      method: 'GET'
    })
  }

  versions (cragSectorId) {
    return axios({
      url: `${this.baseUrl}/crag_sectors/${cragSectorId}/versions.json`,
      method: 'GET'
    })
  }

  photos (cragSectorId) {
    return axios({
      url: `${this.baseUrl}/crag_sectors/${cragSectorId}/photos.json`,
      method: 'GET'
    })
  }

  videos (cragSectorId) {
    return axios({
      url: `${this.baseUrl}/crag_sectors/${cragSectorId}/videos.json`,
      method: 'GET'
    })
  }

  find (cragId, cragSectorId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/crag_sectors/${cragSectorId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/crags/${data.crag_id}/crag_sectors.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_sector: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/crags/${data.crag_id}/crag_sectors/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_sector: data
      },
      method: 'PUT'
    })
  }
}
export default new CragSectorApi()
