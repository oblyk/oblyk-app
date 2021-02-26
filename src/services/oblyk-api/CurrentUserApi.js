import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CurrentUserApi extends BaseApi {
  current () {
    return axios({
      url: `${this.baseUrl}/current_users.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  favorites () {
    return axios({
      url: `${this.baseUrl}/current_users/favorites.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  subscribes () {
    return axios({
      url: `${this.baseUrl}/current_users/subscribes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  followers () {
    return axios({
      url: `${this.baseUrl}/current_users/followers.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascentCragRoutes () {
    return axios({
      url: `${this.baseUrl}/current_users/ascent_crag_routes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascendedCragsGeoJson () {
    return axios({
      url: `${this.baseUrl}/current_users/ascended_crags_geo_json.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  tickList () {
    return axios({
      url: `${this.baseUrl}/current_users/tick_lists.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  projects () {
    return axios({
      url: `${this.baseUrl}/current_users/projects.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  library () {
    return axios({
      url: `${this.baseUrl}/current_users/library.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/current_users.json`,
      headers: { Authorization: this.authToken() },
      data: {
        user: data
      },
      method: 'PUT'
    })
  }

  avatar (data) {
    return axios({
      url: `${this.baseUrl}/current_users/avatar.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  banner (data) {
    return axios({
      url: `${this.baseUrl}/current_users/banner.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }
}
export default new CurrentUserApi()
