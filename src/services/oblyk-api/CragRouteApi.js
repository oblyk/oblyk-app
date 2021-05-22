import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragRouteApi extends BaseApi {
  allInCrag (cragId, page = 1, orderBy = 'difficulty_desc') {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        order_by: orderBy
      }
    })
  }

  allInCragSector (cragSectorId, page = 1, orderBy = 'difficulty_desc') {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/crag_routes.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        order_by: orderBy
      }
    })
  }

  searchInCrag (cragId, query) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes/search.json?query=${query}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  searchInSector (sectorId, query) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${sectorId}/crag_routes/search.json?query=${query}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (cragRouteId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragRouteId, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page: page
      }
    })
  }

  videos (cragRouteId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (cragId, routeId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes/${routeId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_route: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/crag_routes/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_route: data
      }
    })
  }
}
export default new CragRouteApi()
