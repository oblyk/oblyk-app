import BaseApi from '~/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  find (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}.json`,
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

  contribution (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/contribution.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  photos (userUuid, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  videos (userUuid, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  subscribes (userUuid, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/subscribes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  followers (userUuid, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  userPartnerGeoJson (userUuid, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/partner_user_geo_json.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        minimalistic
      }
    })
  }

  outdoorFigures (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  outdoorClimbTypesChart (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragRoutes (userUuid, order = 'difficulty', climbingType = 'all', page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/ascended_crag_routes.json`,
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

  outdoorGradesChart (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorFigures (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/indoor_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorClimbingTypeChart (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/indoor_climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorGradeChart (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/indoor_grade_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  indoorByLevelsChart (userUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/indoor_by_level_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default UserApi
