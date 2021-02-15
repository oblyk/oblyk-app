import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class TickListApi extends BaseApi {
  create (cragRouteId) {
    return axios({
      url: `${this.baseUrl}/tick_lists.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_route_id: cragRouteId
      },
      method: 'POST'
    })
  }

  delete (cragRouteId) {
    return axios({
      url: `${this.baseUrl}/tick_lists.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag_route_id: cragRouteId
      },
      method: 'DELETE'
    })
  }
}
export default new TickListApi()
