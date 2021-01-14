import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookWebApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/guide_book_webs.json`,
      method: 'GET'
    })
  }

  find (id) {
    return axios({
      url: `${this.baseUrl}/guide_book_webs/${id}.json`,
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_webs/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        guide_book_web: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/guide_book_webs.json`,
      headers: { Authorization: this.authToken() },
      data: {
        guide_book_web: data
      },
      method: 'POST'
    })
  }
}
export default new GuideBookWebApi()
