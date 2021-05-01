import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CurrentUserApi extends BaseApi {
  current () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  feed (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/feed.json?page=${page}`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  favoriteGyms (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/favorite_gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  favoriteCrags (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/favorite_crags.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  subscribes () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/subscribes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  followers () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascentCragRoutes () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascent_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragsGeoJson () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crags_geo_json.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  tickList () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/tick_lists.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  projects () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/projects.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  library () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/library.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/current_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        user: data
      }
    })
  }

  avatar (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/current_users/avatar.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }

  banner (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/current_users/banner.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }
}
export default new CurrentUserApi()
