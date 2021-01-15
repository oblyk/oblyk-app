import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class CommentApi extends BaseApi {
  allInCommentable (commentableType, commentableId) {
    return axios({
      url: `${this.baseUrl}/comments.json`,
      params: {
        commentable_type: commentableType,
        commentable_id: commentableId
      },
      method: 'GET'
    })
  }

  find (commentId) {
    return axios({
      url: `${this.baseUrl}/comments/${commentId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/comments.json`,
      headers: { Authorization: this.authToken() },
      data: {
        comment: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/comments/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        comment: data
      },
      method: 'PUT'
    })
  }

  delete (commentId) {
    return axios({
      url: `${this.baseUrl}/comments/${commentId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new CommentApi()
