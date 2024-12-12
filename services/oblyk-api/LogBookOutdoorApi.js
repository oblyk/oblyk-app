import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookOutdoorApi extends BaseApi {
  // Method to dynamically generate the filters object
  generateFiltersHash (filters = [], climbingType = 'all') {
    if (!filters) { return {} }
    return {
      filters: {
        only_lead_climbs: filters.includes('only_lead_climbs'),
        only_on_sight: filters.includes('only_on_sight'),
        no_double: filters.includes('no_double'),
        climbing_type_filter: climbingType
      }
    }
  }

  figures (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  climbingTypeChart (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/climb_types_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  gradeChart (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/grades_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  yearChart (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/years_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  monthChart (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/months_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  evolutionChart (filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/outdoors/evolutions_chart.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: this.generateFiltersHash(filters)
    })
  }

  ascendedCragRoutes (order = 'difficulty', climbingType = 'all', page = 1, filters = []) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/ascended_crag_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        ...this.generateFiltersHash(filters, climbingType),
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
