import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PlaceOfSaleApi extends BaseApi {
  find (guideBookPaperId, placeOfSaleId) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${guideBookPaperId}/place_of_sales/${placeOfSaleId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${data.guide_book_paper_id}/place_of_sales.json`,
      headers: { Authorization: this.authToken() },
      data: {
        place_of_sale: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${data.guide_book_paper_id}/place_of_sales/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        place_of_sale: data
      },
      method: 'PUT'
    })
  }

  delete (guideBookPaperId, placeOfSaleId) {
    return axios({
      url: `${this.baseUrl}/guide_book_papers/${guideBookPaperId}/place_of_sales/${placeOfSaleId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new PlaceOfSaleApi()
