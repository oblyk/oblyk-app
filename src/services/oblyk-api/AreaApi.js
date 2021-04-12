import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AreaApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (areaId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  crags (areaId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (areaId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (areaId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/areas.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        area: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/areas/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        area: data
      }
    })
  }

  addCrag (areaId, cragId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/areas/${areaId}/add_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        area: {
          crag_id: cragId
        }
      }
    })
  }

  removeCrag (areaId, cragId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/public/areas/${areaId}/remove_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        area: {
          crag_id: cragId
        }
      }
    })
  }
}
export default new AreaApi()
