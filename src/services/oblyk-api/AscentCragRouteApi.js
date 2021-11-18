import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AscentCragRouteApi extends BaseApi {
  all (cragRouteId = null) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/ascent_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        crag_route_id: cragRouteId
      }
    })
  }

  find (ascentCragRouteId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/ascent_crag_routes/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_crag_route: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/ascent_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_crag_route: data
      }
    })
  }

  delete (ascentCragRouteId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  addUser (ascentCragRouteId, userId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}/add_ascent_user.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_user: {
          user_id: userId
        }
      }
    })
  }

  removeUser (ascentCragRouteId, userId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}/remove_ascent_user.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_user: {
          user_id: userId
        }
      }
    })
  }

  export (type = 'ascents') {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/ascent_crag_routes/export.csv`,
      responseType: 'blob',
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        type: type
      }
    })
  }
}
export default new AscentCragRouteApi()
