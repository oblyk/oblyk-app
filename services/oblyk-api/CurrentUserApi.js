import BaseApi from '~/services/oblyk-api/BaseApi'

class CurrentUserApi extends BaseApi {
  current () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  feed (page = 1, data = {}) {
    return this.axios.request({
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
        local_news: data.localNews,
        latitude: data.latitude,
        longitude: data.longitude
      }
    })
  }

  favoriteGyms (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/favorite_gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  favoriteCrags (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/favorite_crags.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  subscribes (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/subscribes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { page }
    })
  }

  likes () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/likes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  subscribesAscents (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/subscribes_ascents.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { page }
    })
  }

  followers (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { page }
    })
  }

  waitingFollowers () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/waiting_followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascentCragRoutes () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascent_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragsGeoJson (minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crags_geo_json.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        minimalistic
      }
    })
  }

  tickList () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/tick_lists.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  projects () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/projects.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  organizations () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/organizations.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  library () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/library.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  libraryFigures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/library_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascentsWithoutGuides () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascents_without_guides.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  newGuideBooksVersion () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/new_guide_books_version.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  photos (id = null, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  videos (page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  subscribeToNewsletter () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/subscribe_to_newsletter.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
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

  updatePassword (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/current_users/update_password.json`,
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/current_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  acceptSubscribes (userId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/current_users/accept_followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        user_id: userId
      }
    })
  }

  rejectSubscribes (userId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/current_users/reject_followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        user_id: userId
      }
    })
  }

  partnerFigures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/partner_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  partnerAroundLocalities (filters, newSince, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/partner_around_localities.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        level: filters.level,
        climbing_type: filters.climbingType,
        new_since: newSince,
        page
      }
    })
  }

  partnerChecked () {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/current_users/partner_checked.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default CurrentUserApi
