import BaseApi from '~/services/oblyk-api/BaseApi'

class ApproachApi extends BaseApi {
  all (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, approachId, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: approachId,
        minimalistic
      }
    })
  }

  find (cragId, approachId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches/${approachId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/approaches.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        approach: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/approaches/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        approach: data
      }
    })
  }
}
export default ApproachApi
