import BaseApi from '~/services/oblyk-api/BaseApi'

class TickListApi extends BaseApi {
  create (cragRouteId) {
    return this.axios.request({
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
    return this.axios.request({
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
export default TickListApi
