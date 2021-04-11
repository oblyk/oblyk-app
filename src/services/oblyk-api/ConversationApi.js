import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ConversationApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/conversations.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (conversationId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/conversations/${conversationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
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
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/conversations/${conversationId}/read.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new ConversationApi()
