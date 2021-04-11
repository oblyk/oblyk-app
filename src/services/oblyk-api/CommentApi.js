import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CommentApi extends BaseApi {
  allInCommentable (commentableType, commentableId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/comments.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        commentable_type: commentableType,
        commentable_id: commentableId
      }
    })
  }

  find (commentId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/comments/${commentId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/comments.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        comment: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/comments/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        comment: data
      }
    })
  }

  delete (commentId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/comments/${commentId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new CommentApi()
