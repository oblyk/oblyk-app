import BaseApi from '~/services/oblyk-api/BaseApi'

class PartnerApi extends BaseApi {
  geoJson (minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/partners/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        minimalistic
      }
    })
  }

  figures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/partners/figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  partnersAround (latitude, longitude, distance = 20) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/partners/partners_around.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        latitude,
        longitude,
        distance
      }
    })
  }
}
export default PartnerApi
