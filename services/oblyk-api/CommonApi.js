import BaseApi from '~/services/oblyk-api/BaseApi'

class CommonApi extends BaseApi {
  figures () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  microStats (figures) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/micro_stats.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        figures
      }
    })
  }

  lastAdded () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/last_added.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  activeGyms () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/active_gyms.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }
}
export default CommonApi
