import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GuideBookPaperApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/guide_book_papers.json`,
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
