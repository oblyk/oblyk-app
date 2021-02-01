import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AreaApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/areas.json`,
      method: 'GET'
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      cancelToken: this.tokenSearchSource.token,
      url: `${this.baseUrl}/areas/search.json?query=${query}`,
      method: 'GET'
    })
  }

  geoJson (areaId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}/geo_json.json`,
      method: 'GET'
    })
  }

  crags (areaId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}/crags.json`,
      method: 'GET'
    })
  }

  find (areaId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}.json`,
      method: 'GET'
    })
  }

  photos (areaId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}/photos.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/areas.json`,
      headers: { Authorization: this.authToken() },
      data: {
        area: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/areas/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        area: data
      },
      method: 'PUT'
    })
  }

  addCrag (areaId, cragId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}/add_crag.json`,
      headers: { Authorization: this.authToken() },
      data: {
        area: {
          crag_id: cragId
        }
      },
      method: 'POST'
    })
  }

  removeCrag (areaId, cragId) {
    return axios({
      url: `${this.baseUrl}/areas/${areaId}/remove_crag.json`,
      headers: { Authorization: this.authToken() },
      data: {
        area: {
          crag_id: cragId
        }
      },
      method: 'DELETE'
    })
  }
}
export default new AreaApi()
