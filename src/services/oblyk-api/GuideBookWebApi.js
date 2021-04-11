import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GuideBookWebApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/guide_book_webs.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/guide_book_webs/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/guide_book_webs/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_web: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/guide_book_webs.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        guide_book_web: data
      }
    })
  }
}
export default new GuideBookWebApi()
