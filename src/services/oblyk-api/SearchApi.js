import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class SearchApi extends BaseApi {
  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/search.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { query: query }
    })
  }
}
export default new SearchApi()
