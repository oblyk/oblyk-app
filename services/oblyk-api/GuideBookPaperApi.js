import BaseApi from '~/services/oblyk-api/BaseApi'

class GuideBookPaperApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  grouped (group = 'publication_year', direction = 'desc') {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/grouped.json`,
      params: { group, direction },
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (guideBookPaperId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  around (lat, lng, dist) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/around.json?lat=${lat}&lng=${lng}&dist=${dist}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  crags (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  articles (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/articles.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (id, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        page
      }
    })
  }

  links (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/links.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  placeOfSales (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/place_of_sales.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  alternatives (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/alternatives.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/guide_book_papers/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_paper: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/guide_book_papers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_paper: data
      }
    })
  }

  addCrag (guideBookPaperId, cragId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/add_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_paper: {
          crag_id: cragId
        }
      }
    })
  }

  removeCrag (guideBookPaperId, cragId) {
    return this.axios.request({
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/remove_crag.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_paper: {
          crag_id: cragId
        }
      },
      method: 'DELETE'
    })
  }
}
export default GuideBookPaperApi
