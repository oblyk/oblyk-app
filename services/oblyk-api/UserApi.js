import BaseApi from '~/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  find (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  contribution (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/contribution.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  photos (userName, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  videos (userName, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  subscribes (userName, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/subscribes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  followers (userName, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  localities (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/localities.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  stats (userName, statsList = {}, filters = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/stats.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        roping_filter: filters.ropingStatusList,
        ascent_filter: filters.ascentStatusList,
        climbing_type_filter: filters.climbingTypeList,
        stats_list: statsList
      }
    })
  }

  ascendedCragRoutes (userName, order = 'difficulty', filters = {}, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        roping_filter: filters.ropingStatusList,
        ascent_filter: filters.ascentStatusList,
        climbing_type_filter: filters.climbingTypeList,
        order,
        page
      }
    })
  }

  indoorFigures (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/indoor_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorClimbingTypeChart (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/indoor_climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorGradeChart (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/indoor_grade_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorByLevelsChart (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/indoor_by_level_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}

export default UserApi
