import BaseApi from '~/services/oblyk-api/BaseApi'

class CommentApi extends BaseApi {
  allInCommentable (commentableType, commentableId) {
    return this.axios.request({
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
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/comments/${commentId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  comments (commentId, page = 1) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/comments/${commentId}/comments.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: { page }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/comments/${commentId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default CommentApi
