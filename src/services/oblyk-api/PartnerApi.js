import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PartnerApi extends BaseApi {
  geoJson () {
    return axios({
      url: `${this.baseUrl}/partners/geo_json.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new PartnerApi()
