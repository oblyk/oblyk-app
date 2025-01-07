import qs from 'qs'
import BaseApi from '~/services/oblyk-api/BaseApi'

// Fonction pour convertir camelCase en snake_case
function camelToSnake (obj) {
  const newObj = {}
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      newObj[newKey] = obj[key]
    }
  }
  return newObj
}

class LogBookOutdoorApi extends BaseApi {
  // if user_id is null, it will return the current user's logbook
  stats (stats_list = {}, filters = {}, user_id = null) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/stats.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        user_id,
        filters: camelToSnake(filters),
        stats_list: camelToSnake(stats_list)
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets', encode: false })
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
        filters: camelToSnake(filters),
        order,
        page
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets', encode: false })
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
