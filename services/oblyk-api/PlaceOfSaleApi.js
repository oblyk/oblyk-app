import BaseApi from '~/services/oblyk-api/BaseApi'

class PlaceOfSaleApi extends BaseApi {
  find (guideBookPaperId, placeOfSaleId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/place_of_sales/${placeOfSaleId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/guide_book_papers/${data.guide_book_paper_id}/place_of_sales.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        place_of_sale: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/guide_book_papers/${data.guide_book_paper_id}/place_of_sales/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        place_of_sale: data
      }
    })
  }

  delete (guideBookPaperId, placeOfSaleId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/public/guide_book_papers/${guideBookPaperId}/place_of_sales/${placeOfSaleId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default PlaceOfSaleApi
