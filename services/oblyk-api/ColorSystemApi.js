import BaseApi from '~/services/oblyk-api/BaseApi'

class ColorSystemApi extends BaseApi {
  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/color_systems/${id}.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  all (gymId = null) {
    return this.axios.request({
      method: 'GET',
      url: gymId !== null ? `${this.baseUrl}/gyms/${gymId}/color_systems.json` : `${this.baseUrl}/color_systems.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/color_systems.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        color_system: data
      }
    })
  }
}
export default ColorSystemApi
