import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  stats (stats_list = {}, filters = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/stats.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        filters,
        stats_list
      }
    })
  }

  ascendedCragRoutes (order = 'difficulty', filters = {}, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        filters,
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
