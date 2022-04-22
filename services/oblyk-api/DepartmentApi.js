import BaseApi from '~/services/oblyk-api/BaseApi'

class DepartmentApi extends BaseApi {
  all (country) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/countries/${country}/departments.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (country, department) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/countries/${country}/departments/${department}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routeFigures (country, department) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/countries/${country}/departments/${department}/route_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (country, department, filters) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/countries/${country}/departments/${department}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: filters
    })
  }
}
export default DepartmentApi
