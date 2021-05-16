import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CragApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  guideBooksAround (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/guide_books_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  areasAround (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/areas_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  cragsAround (latitude, longitude, distance = '20km') {
    const CancelToken = axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/crags_around.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      }
    })
  }

  geoJsonAround (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  guides (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/guides.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  articles (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/articles.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  videos (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routeFigures (cragId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/route_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/crags.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        crag: data
      }
    })
  }
}
export default new CragApi()
