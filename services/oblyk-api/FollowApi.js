import BaseApi from '~/services/oblyk-api/BaseApi'

class FollowApi extends BaseApi {
  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/follows.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data
    })
  }

  increment (followableType, followableId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/follows/increment.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        followable_type: followableType,
        followable_id: followableId
      }
    })
  }

  delete (data) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/follows.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data
    })
  }
}
export default FollowApi
