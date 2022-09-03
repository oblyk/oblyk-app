import BaseApi from '~/services/oblyk-api/BaseApi'

class CragSectorApi extends BaseApi {
  all (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_sectors.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, cragSectorId, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_sectors/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: cragSectorId,
        minimalistic
      }
    })
  }

  versions (cragSectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragSectorId, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page
      }
    })
  }

  videos (cragSectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (cragSectorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/route_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default CragSectorApi
