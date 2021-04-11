import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class TickListApi extends BaseApi {
  create (cragRouteId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/tick_lists.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_route_id: cragRouteId
      }
    })
  }

  delete (cragRouteId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/tick_lists.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag_route_id: cragRouteId
      }
    })
  }
}
export default new TickListApi()
