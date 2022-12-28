import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookIndoorApi extends BaseApi {
  figures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  simpleStatsByGyms (params) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/simple_stats_by_gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params
    })
  }

  climbingTypeChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  gradeChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  byLevelsChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/by_levels_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  yearChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/years_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  monthChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/months_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default LogBookIndoorApi
