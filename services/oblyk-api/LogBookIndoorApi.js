import BaseApi from '~/services/oblyk-api/BaseApi'

class LogBookIndoorApi extends BaseApi {
  simpleStatsByGyms (params) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/log_books/indoors/simple_stats_by_gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params
    })
  }
}
export default LogBookIndoorApi
