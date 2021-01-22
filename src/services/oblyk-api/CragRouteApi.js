import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragRouteApi extends BaseApi {
  allInCrag (cragId, page = 1) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/crag_routes.json?page=${page}`,
      method: 'GET'
    })
  }

  allInCragSector (cragSectorId, page = 1) {
    return axios({
      url: `${this.baseUrl}/crag_sectors/${cragSectorId}/crag_routes.json?page=${page}`,
      method: 'GET'
    })
  }

  find (cragId, routeId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/crag_routes/${routeId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}//crags/${data.crag_id}/crag_routes.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_route: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}//crags/${data.crag_id}/crag_routes/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_route: data
      },
      method: 'PUT'
    })
  }
}
export default new CragRouteApi()
