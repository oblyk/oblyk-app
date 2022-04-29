import BaseApi from '~/services/oblyk-api/BaseApi'

class GuideBookPdfApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_pdfs.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_pdfs/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/guide_book_pdfs/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_pdf: data
      }
    })
  }
}
export default GuideBookPdfApi
