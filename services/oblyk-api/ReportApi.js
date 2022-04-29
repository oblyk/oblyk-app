import BaseApi from '~/services/oblyk-api/BaseApi'

class ReportApi extends BaseApi {
  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/reports.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        report: data
      }
    })
  }
}
export default ReportApi
