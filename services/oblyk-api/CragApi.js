import BaseApi from '~/services/oblyk-api/BaseApi'

class CragApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  advancedSearch (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/advanced_search.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  geoJson (minimalistic = true, params = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        minimalistic,
        ...params
      }
    })
  }

  additionalGeoJsonFeatures (cragIds) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/additional_geo_json_features.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        ids: cragIds
      }
    })
  }

  guideBooksAround (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/guide_books_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  areasAround (cragId) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/areas_around.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  cragsAround (latitude, longitude, distance = 20) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/crags_around.json`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude,
        longitude,
        distance
      }
    })
  }

  geoJsonAround (cragId, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        minimalistic
      }
    })
  }

  find (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  random () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/random.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  guides (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/guides.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  articles (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/articles.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (cragId, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page
      }
    })
  }

  videos (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routeFigures (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/route_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
export default CragApi
