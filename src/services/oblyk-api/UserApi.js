import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  find (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      cancelToken: this.tokenSearchSource.token,
      headers: { Authorization: this.authToken() },
      url: `${this.baseUrl}/users/search.json?query=${query}`,
      method: 'GET'
    })
  }

  contribution (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/contribution.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  photos (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/photos.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  videos (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/videos.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  subscribes (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/subscribes.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  followers (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/followers.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  userPartnerGeoJson (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/partner_user_geo_json.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  outdoorFigures (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/outdoor_figures.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  outdoorClimbTypesChart (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/outdoor_climb_types_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascendedCragRoutes (userUuid, order = 'difficulty') {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/ascended_crag_routes.json`,
      params: {
        order: order
      },
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  outdoorGradesChart (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/outdoor_grades_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new UserApi()
