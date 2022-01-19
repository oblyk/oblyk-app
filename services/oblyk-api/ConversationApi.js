import BaseApi from '~/services/oblyk-api/BaseApi'

class ConversationApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/conversations.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (conversationId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/conversations/${conversationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/conversations.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        conversation: data
      }
    })
  }

  read (conversationId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/conversations/${conversationId}/read.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default ConversationApi
