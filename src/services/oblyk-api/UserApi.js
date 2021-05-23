import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  find (userUuid) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
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
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/contribution.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  photos (userUuid, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  videos (userUuid, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  subscribes (userUuid, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/subscribes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  followers (userUuid, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/followers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  userPartnerGeoJson (userUuid) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/partner_user_geo_json.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  outdoorFigures (userUuid) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  outdoorClimbTypesChart (userUuid) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragRoutes (userUuid, order = 'difficulty', climbingType = 'all', page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        order: order,
        climbing_type: climbingType,
        page: page
      }
    })
  }

  outdoorGradesChart (userUuid) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/users/${userUuid}/outdoor_grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new UserApi()
