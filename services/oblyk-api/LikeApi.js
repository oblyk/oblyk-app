import BaseApi from '~/services/oblyk-api/BaseApi'

class LikeApi extends BaseApi {
  allInLikeable (likeableType, likeableId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/likes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        likeable_type: likeableType,
        likeable_id: likeableId
      }
    })
  }

  find (likeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/likes/${likeId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/likes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        like: data
      }
    })
  }

  delete (data) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/likes/${data.likeable_type}/${data.likeable_id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default LikeApi
