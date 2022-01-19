import BaseApi from '~/services/oblyk-api/BaseApi'

class GuideBookWebApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_webs.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/guide_book_webs/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/guide_book_webs/${data.id}.json`,
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
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/guide_book_webs.json`,
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
export default GuideBookWebApi
