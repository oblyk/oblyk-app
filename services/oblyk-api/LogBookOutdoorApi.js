import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  // if user_id is null, it will return the current user's logbook
  stats (statsList = {}, filters = {}, user_id = null) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/stats.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        user_id,
        roping_filter: filters.ropingStatusList,
        ascent_filter: filters.ascentStatusList,
        climbing_type_filter: filters.climbingTypeList,
        stats_list: statsList
      }
    })
  }

  ascendedCragRoutes (order = 'difficulty', filters = {}, page = 1, user_id = null) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        user_id,
        roping_filter: filters.ropingStatusList,
        ascent_filter: filters.ascentStatusList,
        climbing_type_filter: filters.climbingTypeList,
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
