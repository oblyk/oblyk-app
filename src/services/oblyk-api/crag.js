import axios from 'axios'
import BaseApi from '@/services/oblyk-api/base'

class CragApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/crags.json`,
      method: 'GET'
    })
  }

  find (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}.json`,
      method: 'GET'
    })
  }
}
export default new CragApi()
