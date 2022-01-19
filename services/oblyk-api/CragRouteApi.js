import BaseApi from '~/services/oblyk-api/BaseApi'

class CragRouteApi extends BaseApi {
  allInCrag (cragId, page = 1, orderBy = 'difficulty_desc') {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        order_by: orderBy
      }
    })
  }

  allInCragSector (cragSectorId, page = 1, orderBy = 'difficulty_desc') {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${cragSectorId}/crag_routes.json?page=${page}`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        order_by: orderBy
      }
    })
  }

  searchInCrag (cragId, query) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes/search.json?query=${query}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  searchInSector (sectorId, query) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_sectors/${sectorId}/crag_routes/search.json?query=${query}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (cragRouteId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragRouteId, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page
      }
    })
  }

  videos (cragRouteId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/${cragRouteId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (cragId, routeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/crag_routes/${routeId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  random () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crag_routes/random.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
export default CragRouteApi
