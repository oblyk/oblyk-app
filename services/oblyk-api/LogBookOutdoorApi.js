import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  figures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  climbingTypeChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  gradeChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  yearChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/years_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  monthChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/months_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  evolutionChart () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/evolutions_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascendedCragRoutes (order = 'difficulty', climbingType = 'all', page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        climbing_type: climbingType,
        order,
        page
      }
    })
  }

  dailyAscents () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/daily_ascents.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  ascentsOfCrag (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/ascents_of_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        crag_id: cragId
      }
    })
  }
}
export default LogBookOutdoorApi
