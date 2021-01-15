import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookPaperApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/guide_book_papers.json`,
      method: 'GET'
    })
  }

  crags (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${id}/crags.json`,
      method: 'GET'
    })
  }

  photos (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${id}/photos.json`,
      method: 'GET'
    })
  }

  links (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${id}/links.json`,
      method: 'GET'
    })
  }

  placeOfSales (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${id}/place_of_sales.json`,
      method: 'GET'
    })
  }

  find (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${id}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        guide_book_paper: data
      },
      method: 'PUT'
    })
  }

  cover (data, guideBookPaperId) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${guideBookPaperId}/add_cover.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers.json`,
      headers: { Authorization: this.authToken() },
      data: {
        guide_book_paper: data
      },
      method: 'POST'
    })
  }
}
export default new GuideBookPaperApi()
