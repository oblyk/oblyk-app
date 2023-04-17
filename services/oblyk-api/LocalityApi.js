import BaseApi from '~/services/oblyk-api/BaseApi'

class LocalityApi extends BaseApi {
  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/localities/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/localities/geo_json.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }

  climbers (id, filters, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/localities/${id}/climbers.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      },
      params: {
        level: filters.level,
        climbing_type: filters.climbingType,
        partner_search: true,
        page
      }
    })
  }
}
export default LocalityApi
