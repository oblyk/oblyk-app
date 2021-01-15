import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ReportApi extends BaseApi {
  create (data) {
    return axios({
      url: `${this.baseUrl}/reports.json`,
      headers: { Authorization: this.authToken() },
      data: {
        report: data
      },
      method: 'POST'
    })
  }
}
export default new ReportApi()
