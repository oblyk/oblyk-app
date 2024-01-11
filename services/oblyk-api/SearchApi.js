import BaseApi from '~/services/oblyk-api/BaseApi'

class SearchApi extends BaseApi {
  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/search.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { query }
    })
  }

  searchAll (query, collections, page = 1) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/search_all.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { query, collections, page }
    })
  }

  searchAround (latitude, longitude, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/search_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { latitude, longitude, page }
    })
  }
}
export default SearchApi
