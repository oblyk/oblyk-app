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

  feed (page = 1, data = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/feed.json?page=${page}`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        articles: data.articles,
        guide_books: data.guideBooks,
        subscribes: data.subscribes,
        local_news: data.localNews
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

  photos (id = null, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  videos (page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  subscribeToNewsletter () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/current_users/subscribe_to_newsletter.json`,
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

  delete () {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/current_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new CurrentUserApi()
