import BaseApi from '~/services/oblyk-api/BaseApi'

class AreaApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (areaId, minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        minimalistic
      }
    })
  }

  crags (areaId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  cragsFigures (areaId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/crags_figures.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (areaId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (areaId, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/areas/${areaId}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page
      }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
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
export default AreaApi
