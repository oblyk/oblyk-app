import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AscentGymRouteApi extends BaseApi {
  all (gymRouteId = null) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/ascent_gym_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        gym_route_id: gymRouteId
      }
    })
  }

  find (ascentGymRouteId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/ascent_gym_routes/${ascentGymRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return axios({
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
    return axios({
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
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/ascent_gym_routes/${ascentGymRouteId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new AscentGymRouteApi()
