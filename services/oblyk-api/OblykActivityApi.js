import BaseApi from '~/services/oblyk-api/BaseApi'

class OblykActivityApi extends BaseApi {
  feed (page = 1, data = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/last_activity_feed.json?page=${page}`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default OblykActivityApi
