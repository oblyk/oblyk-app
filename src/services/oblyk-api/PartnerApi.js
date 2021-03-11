import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PartnerApi extends BaseApi {
  geoJson () {
    return axios({
      url: `${this.baseUrl}/partners/geo_json.json`,
      method: 'GET'
    })
  }

  figures () {
    return axios({
      url: `${this.baseUrl}/partners/figures.json`,
      method: 'GET'
    })
  }

  partnersAround (latitude, longitude, distance = '20km') {
    return axios({
      url: `${this.baseUrl}/partners/partners_around.json`,
      headers: { Authorization: this.authToken() },
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      },
      method: 'GET'
    })
  }
}
export default new PartnerApi()
