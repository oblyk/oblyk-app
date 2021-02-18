import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  figures () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/figures.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  climbingTypeChart () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/climb_types_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  gradeChart () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/grades_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  yearChart () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/years_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  monthChart () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/months_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  evolutionChart () {
    return axios({
      url: `${this.baseUrl}/current_users/log_books/outdoors/evolutions_chart.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  ascendedCragRoutes (order = 'difficulty') {
    return axios({
      url: `${this.baseUrl}/current_users/ascended_crag_routes.json`,
      params: {
        order: order
      },
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new LogBookOutdoorApi()
