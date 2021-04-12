import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookPaperApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (guideBookPaperId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  search (query) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/search.json?query=${query}`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  crags (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/crags.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  articles (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/articles.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  links (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/links.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  placeOfSales (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}/place_of_sales.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
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

  cover (data, guideBookPaperId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/add_cover.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }

  create (data) {
    return axios({
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
    return axios({
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
    return axios({
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
export default new GuideBookPaperApi()
