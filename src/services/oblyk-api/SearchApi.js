import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class SearchApi extends BaseApi {
  search (query) {
    return axios({
      url: `${this.baseUrl}/search.json`,
      params: { query: query },
      method: 'GET'
    })
  }
}
export default new SearchApi()
