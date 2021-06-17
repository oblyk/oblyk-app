import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PartnerApi extends BaseApi {
  geoJson () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/partners/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  figures () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/partners/figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  partnersAround (latitude, longitude, distance = 20) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/partners/partners_around.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      }
    })
  }
}
export default new PartnerApi()
