import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ParkApi extends BaseApi {
  all (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/crags/${cragId}/parks.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, parkId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/crags/${cragId}/parks/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: parkId
      }
    })
  }

  find (cragId, parkId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/crags/${cragId}/parks/${parkId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/crags/${data.crag_id}/parks.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        park: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/crags/${data.crag_id}/parks/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        park: data
      }
    })
  }
}
export default new ParkApi()
