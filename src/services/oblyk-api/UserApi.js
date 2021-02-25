import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class UserApi extends BaseApi {
  find (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  contribution (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/contribution.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  userPartnerGeoJson (userUuid) {
    return axios({
      url: `${this.baseUrl}/users/${userUuid}/partner_user_geo_json.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new UserApi()
