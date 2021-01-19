import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookPdfApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/guide_book_pdfs.json`,
      method: 'GET'
    })
  }

  find (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_pdfs/${id}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_pdfs/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        guide_book_pdf: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_pdfs.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }
}
export default new GuideBookPdfApi()
