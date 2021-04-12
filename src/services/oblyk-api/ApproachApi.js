import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ApproachApi extends BaseApi {
  all (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, approachId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: approachId
      }
    })
  }

  find (cragId, approachId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/approaches/${approachId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
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
    return axios({
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
export default new ApproachApi()
