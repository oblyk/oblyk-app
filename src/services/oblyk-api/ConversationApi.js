import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ConversationApi extends BaseApi {
  all () {
    return axios({
      url: `${this.baseUrl}/conversations.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  find (conversationId) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/conversations.json`,
      headers: { Authorization: this.authToken() },
      data: {
        conversation: data
      },
      method: 'POST'
    })
  }

  read (conversationId) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}/read.json`,
      headers: { Authorization: this.authToken() },
      method: 'POST'
    })
  }
}
export default new ConversationApi()
