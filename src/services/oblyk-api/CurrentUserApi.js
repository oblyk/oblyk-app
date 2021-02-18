import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CurrentUserApi extends BaseApi {
  current () {
    return axios({
      url: `${this.baseUrl}/users/current.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  subscribes () {
    return axios({
      url: `${this.baseUrl}/users/current/subscribes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascentCragRoutes () {
    return axios({
      url: `${this.baseUrl}/users/current/ascent_crag_routes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascendedCragsGeoJson () {
    return axios({
      url: `${this.baseUrl}/users/current/ascended_crags_geo_json.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  tickList () {
    return axios({
      url: `${this.baseUrl}/users/current/tick_lists.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  projects () {
    return axios({
      url: `${this.baseUrl}/users/current/projects.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  library () {
    return axios({
      url: `${this.baseUrl}/users/current/library.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/users/current.json`,
      headers: { Authorization: this.authToken() },
      data: {
        user: data
      },
      method: 'PUT'
    })
  }

  avatar (data) {
    return axios({
      url: `${this.baseUrl}/users/current/avatar.json`,
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
      url: `${this.baseUrl}/users/current/banner.json`,
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
