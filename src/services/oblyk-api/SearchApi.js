import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class SearchApi extends BaseApi {
  search (query) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/search.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { query: query }
    })
  }
}
export default new SearchApi()
