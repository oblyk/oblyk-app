import BaseApi from '~/services/oblyk-api/BaseApi'

class ToolApi extends BaseApi {
  qrCoder (params) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/tools/qr_coder.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        message: params.message
      }
    })
  }
}
export default ToolApi
