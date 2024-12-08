import BaseApi from '~/services/oblyk-api/BaseApi'

class GymLabelFontApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_label_fonts.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymLabelFontApi
