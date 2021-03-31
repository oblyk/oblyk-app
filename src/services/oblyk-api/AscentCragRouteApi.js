import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AscentCragRouteApi extends BaseApi {
  all (cragRouteId = null) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes.json`,
      headers: { Authorization: this.authToken() },
      params: {
        crag_route_id: cragRouteId
      },
      method: 'GET'
    })
  }

  find (ascentCragRouteId) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        ascent_crag_route: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes.json`,
      headers: { Authorization: this.authToken() },
      data: {
        ascent_crag_route: data
      },
      method: 'POST'
    })
  }

  delete (ascentCragRouteId) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }

  addUser (ascentCragRouteId, userId) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}/add_ascent_user.json`,
      headers: { Authorization: this.authToken() },
      data: {
        ascent_user: {
          user_id: userId
        }
      },
      method: 'POST'
    })
  }

  removeUser (ascentCragRouteId, userId) {
    return axios({
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}/remove_ascent_user.json`,
      headers: { Authorization: this.authToken() },
      data: {
        ascent_user: {
          user_id: userId
        }
      },
      method: 'DELETE'
    })
  }
}
export default new AscentCragRouteApi()
