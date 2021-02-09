import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CommonApi extends BaseApi {
  figures () {
    return axios({
      url: `${this.baseUrl}/figures.json`,
      method: 'GET'
    })
  }
}
export default new CommonApi()
