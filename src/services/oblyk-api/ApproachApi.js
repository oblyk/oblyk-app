import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ApproachApi extends BaseApi {
  all (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/approaches.json`,
      method: 'GET'
    })
  }

  geoJsonAround (cragId, approachId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/approaches/geo_json_around.json`,
      params: {
        exclude_id: approachId
      },
      method: 'GET'
    })
  }

  find (cragId, approachId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/approaches/${approachId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/crags/${data.crag_id}/approaches.json`,
      headers: { Authorization: this.authToken() },
      data: {
        approach: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/crags/${data.crag_id}/approaches/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        approach: data
      },
      method: 'PUT'
    })
  }
}
export default new ApproachApi()
