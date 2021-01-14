import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/crags.json`,
      method: 'GET'
    })
  }

  geoJson () {
    return axios({
      url: `${this.baseUrl}/crags/geo_json.json`,
      method: 'GET'
    })
  }

  find (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}.json`,
      method: 'GET'
    })
  }

  guides (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/guides.json`,
      method: 'GET'
    })
  }

  photos (cragId) {
    return axios({
      url: `${this.baseUrl}/crags/${cragId}/photos.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/crags.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/crags/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        crag: data
      },
      method: 'PUT'
    })
  }
}
export default new CragApi()
