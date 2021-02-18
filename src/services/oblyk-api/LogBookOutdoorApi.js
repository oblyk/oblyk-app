import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  figures () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/figures.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  climbingTypeChart () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/chartjs/climb_type.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  gradeChart () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/chartjs/grade.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  yearChart () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/chartjs/years.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  monthChart () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/chartjs/months.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  evolutionChart () {
    return axios({
      url: `${this.baseUrl}/users/current/log_book/outdoor/chartjs/evolution.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascendedCragRoutes (order = 'difficulty') {
    return axios({
      url: `${this.baseUrl}/users/current/ascended_crag_routes.json`,
      params: {
        order: order
      },
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new LogBookOutdoorApi()
