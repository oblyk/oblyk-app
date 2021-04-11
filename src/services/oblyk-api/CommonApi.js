import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CommonApi extends BaseApi {
  figures () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default new CommonApi()
