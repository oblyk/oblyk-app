import BaseApi from '~/services/oblyk-api/BaseApi'

class AuthorApi extends BaseApi {
  find (authorId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/authors/${authorId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/authors/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        author: data
      }
    })
  }
}
export default AuthorApi
