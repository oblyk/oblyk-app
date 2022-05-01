import BaseApi from '~/services/oblyk-api/BaseApi'

class TownApi extends BaseApi {
  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/towns/search.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        query
      }
    })
  }

  geoSearch (latitude, longitude, dist = null) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/towns/geo_search.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude,
        longitude,
        dist
      }
    })
  }

  find (townName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/towns/${townName}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (townName) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/towns/${townName}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default TownApi
