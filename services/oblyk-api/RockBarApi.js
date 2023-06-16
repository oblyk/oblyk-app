import BaseApi from '~/services/oblyk-api/BaseApi'

class RockBarApi extends BaseApi {
  find (cragId, id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/rock_bars/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/rock_bars.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        rock_bar: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/rock_bars/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        rock_bar: data
      }
    })
  }

  delete (cragId, id) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/public/crags/${cragId}/rock_bars/${id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default RockBarApi
