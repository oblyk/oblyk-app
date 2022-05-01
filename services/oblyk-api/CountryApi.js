import BaseApi from '~/services/oblyk-api/BaseApi'

class CountryApi extends BaseApi {
  geoJson (country) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/countries/${country}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default CountryApi
