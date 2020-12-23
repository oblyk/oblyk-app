import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class UserApi extends BaseApi {
  current () {
    return axios({
      url: `${this.baseUrl}/users/current.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }
}
export default new UserApi()
