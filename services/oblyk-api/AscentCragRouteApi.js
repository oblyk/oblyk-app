import BaseApi from '~/services/oblyk-api/BaseApi'

class AscentCragRouteApi extends BaseApi {
  all (cragRouteId = null) {
    return this.axios.request({
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
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/ascent_crag_routes/${ascentCragRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  addUser (ascentCragRouteId, userId) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/ascent_crag_routes/export.csv`,
      responseType: 'blob',
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        type
      }
    })
  }
}
export default AscentCragRouteApi
