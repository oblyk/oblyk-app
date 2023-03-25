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

  userPartnerGeoJson (userName, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/partner_user_geo_json.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        minimalistic
      }
    })
  }

  outdoorFigures (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/outdoor_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  outdoorClimbTypesChart (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/outdoor_climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragRoutes (userName, order = 'difficulty', climbingType = 'all', page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        order,
        climbing_type: climbingType,
        page
      }
    })
  }

  outdoorGradesChart (userName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userName}/outdoor_grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
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
