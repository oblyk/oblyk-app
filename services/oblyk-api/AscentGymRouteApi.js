import BaseApi from '~/services/oblyk-api/BaseApi'

class AscentGymRouteApi extends BaseApi {
  all (params = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/ascent_gym_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params
    })
  }

  find (ascentGymRouteId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/ascent_gym_routes/${ascentGymRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/ascent_gym_routes/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_gym_route: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/ascent_gym_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ascent_gym_route: data
      }
    })
  }

  delete (ascentGymRouteId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/ascent_gym_routes/${ascentGymRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default AscentGymRouteApi
