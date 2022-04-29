import BaseApi from '~/services/oblyk-api/BaseApi'

class CommonApi extends BaseApi {
  figures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default CommonApi
